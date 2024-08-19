<script>
import { mapActions, mapState } from 'vuex'
import AddDocuments from '@/pages/AddDocuments.vue'
import LeadTimeline from '@/pages/LeadTimeline.vue'

export default {
  name: 'LeadsTable',
  components: {
    LeadTimeline,
    AddDocuments,
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
        { title: 'Source', key: 'source', align: 'start', sortable: false },
        { title: 'Actions', key: 'actions', align: 'start', sortable: false },
      ],
      selectedLeads: [],
      showTimeline: false,
      showDocumentsDialog: false,
      currentLead: null,
      selectedAssignTo: null,
    }
  },
  computed: {
    ...mapState(['leads', 'users']),
    isAnyLeadSelected() {
      return this.selectedLeads.length > 0
    },
  },
  async created() {
    await this.fetchLeads()
    await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchLeads', 'fetchUsers', 'assignLeads', 'fetchCurrentUser']),
    viewDetails(item) {
      this.currentLead = item
      this.showTimeline = true
    },
    openDocumentsDialog(item) {
      this.currentLead = item
      this.showDocumentsDialog = true
    },
    toggleSelection(item) {
      const index = this.selectedLeads.findIndex(lead => lead.id === item.id)
      if (index >= 0)
        this.selectedLeads.splice(index, 1)
      else this.selectedLeads.push(item)
    },
    async assignLeadsToUser() {
      await this.assignLeads({ selectedLeads: this.selectedLeads, selectedAssignTo: this.selectedAssignTo })
      await this.fetchCurrentUser(this.selectedAssignTo)
      this.selectedLeads = []
    },
  },
}
</script>

<template>
  <div>
    <h1>Leads</h1>
    <div class="d-flex justify-space-between align-center mb-4">
      <VSelect
        v-if="isAnyLeadSelected"
        v-model="selectedAssignTo"
        :items="users"
        label="Assign to"
        outlined
      />
      <VBtn
        v-if="isAnyLeadSelected"
        color="primary"
        variant="tonal"
        @click="assignLeadsToUser"
      >
        Assign To
      </VBtn>
    </div>
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
          <td class="actions-column">
            <VBtn
              icon
              small
              class="mini-btn"
              @click="viewDetails(item)"
            >
              <VIcon small>
                mdi-eye
              </VIcon>
            </VBtn>
            <VBtn
              icon
              small
              class="mini-btn"
              @click="openDocumentsDialog(item)"
            >
              <VIcon small>
                mdi-file-document
              </VIcon>
            </VBtn>
          </td>
        </tr>
      </template>
    </VDataTable>
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
            v-if="currentLead"
            :lead="currentLead"
          />
        </VCardText>
      </VCard>
    </VDialog>
    <VDialog
      v-model="showDocumentsDialog"
      fullscreen
    >
      <VCard>
        <VCardTitle>
          Add Documents
          <VSpacer />
          <VBtn
            icon
            @click="showDocumentsDialog = false"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <AddDocuments
            v-if="currentLead"
            :lead="currentLead"
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

.actions-column {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.v-btn.small.mini-btn {
  padding: 0;
  min-width: 24px;
  height: 24px;
  width: 24px;
}

.v-icon {
  font-size: 16px;
}
</style>
