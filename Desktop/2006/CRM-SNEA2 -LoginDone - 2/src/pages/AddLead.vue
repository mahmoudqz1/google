<script>
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  name: 'LeadsView',
  data() {
    return {
      valid: false,
      showForm: false,
      formMode: 'add',
      lead: {
        id: '',
        name: '',
        prenom: '',
        birth: '',
        mail: '',
        postale: '',
        tel: '',
        typepermis: '',
        typeusage: '',
      },
      headers: [
        { title: 'Name', key: 'name', align: 'start', sortable: false },
        { title: 'Prenom', key: 'prenom' },
        { title: 'Birth', key: 'birth' },
        { title: 'Email', key: 'mail' },
        { title: 'Postale', key: 'postale' },
        { title: 'Tel', key: 'tel' },
        { title: 'Type Permis', key: 'typepermis' },
        { title: 'Type Usage', key: 'typeusage' },
        { title: 'Source', key: 'source' },
        { title: 'Actions', key: 'actions' },
      ],
      leads: [],
      users: [],
      selectedLeads: [],
      selectedUser: '',
      emailRules: [
        value => !!value || 'E-mail is required.',
        value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      ],
    }
  },
  async created() {
    await this.fetchLeads()
    await this.fetchUsers()
  },
  methods: {
    async fetchLeads() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Lead'))

        this.leads = querySnapshot.docs
        console.log('Fetched leads:', this.leads)
      }
      catch (error) {
        console.error('Error fetching leads:', error)
      }
    },
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))

        this.users = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log('Fetched users:', this.users)
      }
      catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    toggleForm() {
      this.showForm = !this.showForm
      this.formMode = 'add' // Set form mode to 'add' when showing the form
      // Reset form fields and validation status when hiding the form
      if (!this.showForm)
        this.resetForm()
    },
    editMode(item) {
      this.showForm = true
      this.formMode = 'edit'

      this.lead.id = item.id
      this.lead.name = item.data().name
      this.lead.prenom = item.data().prenom
      this.lead.birth = item.data().birth
      this.lead.mail = item.data().mail
      this.lead.postale = item.data().postale
      this.lead.tel = item.data().tel
      this.lead.typepermis = item.data().typepermis
      this.lead.typeusage = item.data().typeusage
      this.lead.source = item.data().source
    },
    async addLead() {
      try {
        const docRef = await addDoc(collection(db, 'Lead'), {
          name: this.lead.name,
          prenom: this.lead.prenom,
          birth: this.lead.birth,
          mail: this.lead.mail,
          postale: this.lead.postale,
          tel: this.lead.tel,
          typepermis: this.lead.typepermis,
          typeusage: this.lead.typeusage,
          source: this.lead.source,
        })

        console.log('Lead added with ID:', docRef.id)
        this.fetchLeads()
        this.resetForm()
      }
      catch (error) {
        console.error('Error adding lead:', error)
      }
    },
    async updateLead() {
      try {
        const leadRef = doc(db, 'Lead', this.lead.id)

        await updateDoc(leadRef, {
          name: this.lead.name,
          prenom: this.lead.prenom,
          birth: this.lead.birth,
          mail: this.lead.mail,
          postale: this.lead.postale,
          tel: this.lead.tel,
          typepermis: this.lead.typepermis,
          typeusage: this.lead.typeusage,
          source: this.lead.source,
        })
        console.log('Lead updated with ID:', this.lead.id)
        this.fetchLeads()
        this.resetForm()
      }
      catch (error) {
        console.error('Error updating lead:', error)
      }
    },
    async deleteLead(item) {
      try {
        const leadRef = doc(db, 'Lead', item.id)

        await deleteDoc(leadRef)
        console.log('Lead deleted with ID:', item.id)
        this.fetchLeads()
      }
      catch (error) {
        console.error('Error deleting lead:', error)
      }
    },
    cancelForm() {
      this.showForm = false
      this.resetForm()
    },
    resetForm() {
      this.lead = {
        id: '',
        name: '',
        prenom: '',
        birth: '',
        mail: '',
        postale: '',
        tel: '',
        typepermis: '',
        typeusage: '',
        source: '',
      }
      this.valid = false
    },
    handleSelectLead(lead) {
      const index = this.selectedLeads.indexOf(lead.id)
      if (index > -1)
        this.selectedLeads.splice(index, 1)
      else
        this.selectedLeads.push(lead.id)
    },
    async assignLeads() {
      if (!this.selectedUser) {
        console.error('No user selected for assignment')

        return
      }

      try {
        const batch = db.batch()

        this.selectedLeads.forEach(leadId => {
          const leadRef = doc(db, 'Lead', leadId)

          batch.update(leadRef, { assignedTo: this.selectedUser })
        })

        await batch.commit()
        console.log('Leads assigned to user:', this.selectedUser)
        this.selectedLeads = []
        this.selectedUser = ''
        this.fetchLeads()
      }
      catch (error) {
        console.error('Error assigning leads:', error)
      }
    },
  },
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <h1 class="mr-auto">
        Leads
      </h1>
      <VBtn
        color="primary"
        @click="toggleForm"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </div>
    <VForm
      v-if="showForm"
      v-model="valid"
    >
      <VContainer>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.name"
              label="Name"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.prenom"
              label="Prenom"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.birth"
              label="Birth"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.mail"
              :rules="emailRules"
              label="Email"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.postale"
              label="Postale"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.tel"
              label="Tel"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.typepermis"
              label="Type Permis"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.typeusage"
              label="Type Usage"
              hide-details
              required
            />
          </VCol>
          <VCol
            cols="12"
            md="4"
          >
            <VTextField
              v-model="lead.source"
              label="Source"
              hide-details
              required
            />
          </VCol>
        </VRow>
        <VRow>
          <VBtn
            color="primary"
            @click="formMode === 'add' ? addLead() : updateLead()"
          >
            {{ formMode === 'add' ? 'Add Lead' : 'Update Lead' }}
          </VBtn>
          <VBtn
            color="error"
            @click="cancelForm"
          >
            Cancel
          </VBtn>
        </VRow>
      </VContainer>
    </VForm>
    <VDataTable
      :headers="headers"
      :items="leads"
      item-value="id"
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.data().name }}</td>
          <td>{{ item.data().prenom }}</td>
          <td>{{ item.data().birth }}</td>
          <td>{{ item.data().mail }}</td>
          <td>{{ item.data().postale }}</td>
          <td>{{ item.data().tel }}</td>
          <td>{{ item.data().typepermis }}</td>
          <td>{{ item.data().typeusage }}</td>
          <td>{{ item.data().source }}</td>
          <td>
            <VIcon @click="editMode(item)">
              mdi-pencil
            </VIcon>
            <VIcon @click="deleteLead(item)">
              mdi-delete
            </VIcon>
          </td>
        </tr>
      </template>
    </VDataTable>
  </div>
</template>

<style scoped>
th, td {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: 600;
  padding: 12px;
}

td {
  padding: 10px;
}
.d-flex {
  display: flex;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.mr-auto {
  margin-right: auto;
}
</style>
