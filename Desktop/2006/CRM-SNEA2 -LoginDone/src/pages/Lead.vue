<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import LeadTimeline from '@/pages/LeadTimeline.vue'

export default {
  name: 'LeadsTable',
  components: {
    LeadTimeline,
  },
  data() {
    return {
      headers: [
        { title: '', key: 'select', align: 'center', sortable: false },
        { title: 'Name', key: 'name', align: 'start', sortable: false },
        { title: 'Prenom', key: 'prenom', align: 'start', sortable: false },
        { title: 'Birth', key: 'birth', align: 'start', sortable: false },
        { title: 'Email', key: 'mail', align: 'start', sortable: false },
        { title: 'Postale', key: 'postale', align: 'start', sortable: false },
        { title: 'Tel', key: 'tel', align: 'start', sortable: false },
        { title: 'Type Permis', key: 'typepermis', align: 'start', sortable: false },
        { title: 'Type Usage', key: 'typeusage', align: 'start', sortable: false },
        { title: 'source', key: 'source', align: 'start', sortable: false },
        { title: 'Actions', key: 'actions', align: 'start', sortable: false },
      ],
      leads: [],
      selectedLeads: [],
      showTimeline: false,
      currentLeadId: null,
      assignToOptions: [], // Updated to store user names
      selectedAssignTo: null,
    }
  },
  computed: {
    isAnyLeadSelected() {
      return this.selectedLeads.length > 0
    },
  },
  async created() {
    await this.fetchLeads()
    await this.fetchUsers()
  },
  methods: {
    async fetchLeads() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Lead'))

        this.leads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('Fetched leads:', this.leads)
      }
      catch (error) {
        console.error('Error fetching leads:', error)
      }
    },
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))

        this.assignToOptions = querySnapshot.docs.map(doc => doc.data().name)
        console.log('Fetched users:', this.assignToOptions)
      }
      catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    viewDetails(item) {
      this.currentLeadId = item.id
      this.showTimeline = true
      console.log('Viewing details for lead:', this.currentLeadId)
    },
    toggleSelection(item) {
      const index = this.selectedLeads.findIndex(lead => lead.id === item.id)
      if (index >= 0)
        this.selectedLeads.splice(index, 1)
      else
        this.selectedLeads.push(item)

      console.log('Selected leads:', this.selectedLeads)
    },
    assignLeads() {
      console.log('Assigning leads:', this.selectedLeads, 'to', this.selectedAssignTo)

      // Implement your logic to assign selected leads to the selectedAssignTo
      // Example: Call a function or API to perform the assignment
    },
  },
}
</script>

<template>
  <div>
    <h1>Leads</h1>
    <br>
    <div class="d-flex justify-space-between align-center mb-4">
      <br>
      <VSelect
        v-if="isAnyLeadSelected"
        v-model="selectedAssignTo"
        :items="assignToOptions"
        label="Assign to"
        outlined
      />
      <br>
      <VBtn
        v-if="isAnyLeadSelected"
        color="primary"
        variant="tonal"
        @click="assignLeads"
      >
        Assign To
      </VBtn>
      <br>
    </div>
    <!-- Data table -->
    <VDataTable
      :headers="headers"
      :items="leads"
      item-value="name"
    >
      <template #item="{ item }">
        <tr>
          <td>
            <VCheckbox
              v-model="selectedLeads"
              :value="item"
              @click.stop="toggleSelection(item)"
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.prenom }}</td>
          <td>{{ item.birth }}</td>
          <td>{{ item.mail }}</td>
          <td>{{ item.postale }}</td>
          <td>{{ item.tel }}</td>
          <td>{{ item.typepermis }}</td>
          <td>{{ item.typeusage }}</td>
          <td>{{ item.source }}</td>
          <td>
            <VBtn @click="viewDetails(item)">
              VOIR
            </VBtn>
          </td>
        </tr>
      </template>
    </VDataTable>
    <!-- LeadTimeline dialog -->
    <VDialog
      v-model="showTimeline"
      fullscreen
    >
      <VCard>
        <VCardTitle>
          Lead Timeline
          <VSpacer />
          <VBtn
            icon
            @click="showTimeline = false"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <LeadTimeline
            v-if="currentLeadId"
            :lead-id="currentLeadId"
          />
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
th,
td {
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

.mb-4 {
  margin-bottom: 16px;
}
</style>
