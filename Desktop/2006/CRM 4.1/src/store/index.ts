import { arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore'
import { createStore } from 'vuex'
import { db } from '@/firebaseConfig'

interface User {
  name: string
}

interface Lead {
  id: string
  name: string
  prenom: string
  birth: string
  mail: string
  postale: string
  tel: string
  typepermis: string
  typeusage: string
  source: string
  assignedTo?: string
  hiddenBy?: string[]
  done?: boolean // Added property to indicate the lead is done
}

interface State {
  currentUser: User | null
  leads: Lead[]
  users: string[]
  doneLeads: Lead[] // Added state for done leads
}

const store = createStore<State>({
  state: {
    currentUser: null,
    leads: [],
    users: [],
    doneLeads: [], // Initialize done leads array
  },
  mutations: {
    setCurrentUser(state, user: User) {
      console.log('Setting current user in Vuex:', user)
      state.currentUser = user
    },
    setLeads(state, leads: Lead[]) {
      state.leads = leads
    },
    setUsers(state, users: string[]) {
      state.users = users
    },
    updateLead(state, updatedLead: Lead) {
      const index = state.leads.findIndex(lead => lead.id === updatedLead.id)
      if (index !== -1)
        state.leads.splice(index, 1, updatedLead)
    },
    hideLead(state, leadId: string) {
      const index = state.leads.findIndex(lead => lead.id === leadId)
      if (index !== -1)
        state.leads[index].hiddenBy = [...(state.leads[index].hiddenBy || []), state.currentUser?.name]
    },
    setLeadDone(state, leadId: string) {
      const index = state.leads.findIndex(lead => lead.id === leadId)
      if (index !== -1) {
        state.leads[index].done = true

        // Move the lead to doneLeads and remove from leads
        const doneLead = state.leads.splice(index, 1)[0]

        state.doneLeads.push(doneLead)
      }
    },
  },
  actions: {
    async fetchCurrentUser({ commit }, userName: string) {
      const user = { name: userName }

      console.log('Fetching current user:', user)
      commit('setCurrentUser', user)
    },
    async fetchLeads({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'Lead'))
      const leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lead))

      commit('setLeads', leads)
    },
    async fetchUsers({ commit }) {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users = querySnapshot.docs.map(doc => doc.data().name)

      commit('setUsers', users)
    },
    async assignLeads({ commit, state }, { selectedLeads, selectedAssignTo }) {
      const batch = writeBatch(db)

      selectedLeads.forEach(lead => {
        const leadRef = doc(db, 'Lead', lead.id)

        batch.update(leadRef, {
          assignedTo: selectedAssignTo,
          hiddenBy: arrayRemove(selectedAssignTo),
        })
      })
      await batch.commit()
      selectedLeads.forEach(lead => {
        commit('updateLead', { ...lead, assignedTo: selectedAssignTo })
      })
    },
    async hideLead({ commit, state }, leadId: string) {
      const leadRef = doc(db, 'Lead', leadId)

      await updateDoc(leadRef, {
        hiddenBy: arrayUnion(state.currentUser?.name),
      })
      commit('hideLead', leadId)
    },
    async updateLeadStatus({ commit }, { id, done }) {
      // Update the lead status in the Firestore
      const leadRef = doc(db, 'Lead', id)

      await updateDoc(leadRef, { done })

      // Update the local state
      if (done)
        commit('setLeadDone', id)
    },
    async moveLeadToGestion({ commit }, leadId) {
      commit('setLeadDone', leadId)
    },
  },
  getters: {
    assignedLeads: state => (userName: string) => {
      return state.leads.filter(lead => lead.assignedTo === userName && (!lead.hiddenBy || !lead.hiddenBy.includes(userName)))
    },
    doneLeads: state => state.doneLeads, // Getter for done leads
  },
})

export default store
