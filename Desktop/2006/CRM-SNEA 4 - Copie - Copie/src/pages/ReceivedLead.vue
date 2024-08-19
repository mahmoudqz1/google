<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AddDocuments from '@/pages/AddDocuments.vue'
import LeadTimeline from '@/pages/LeadTimeline.vue'

export default {
  name: 'ReceivedLeadsTable',
  components: {
    LeadTimeline,
    AddDocuments,
  },
  data() {
    return {
      headers: [
        { title: 'Name', key: 'name', align: 'start', sortable: false },
        { title: 'Prenom', key: 'prenom', align: 'start', sortable: false },
        { title: 'Birth', key: 'birth', align: 'start', sortable: false },
        { title: 'Email', key: 'mail', align: 'start', sortable: false },
        { title: 'Postale', key: 'postale', align: 'start', sortable: false },
        { title: 'Tel', key: 'tel', align: 'start', sortable: false },
        { title: 'Type Permis', key: 'typepermis', align: 'start', sortable: false },
        { title: 'Type Usage', key: 'typeusage', align: 'start', sortable: false },
        { title: 'Source', key: 'source', align: 'start', sortable: false },
        { title: 'Actions', key: 'actions', align: 'center', sortable: false },
      ],
      showTimeline: false,
      showDocumentsDialog: false,
      currentLead: null,
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['assignedLeads']),
    leads() {
      return this.currentUser ? this.assignedLeads(this.currentUser.name) : []
    },
  },
  methods: {
    ...mapActions(['hideLead']),
    viewDetails(item) {
      this.currentLead = item
      this.showTimeline = true
    },
    openDocumentsDialog(item) {
      this.currentLead = item
      this.showDocumentsDialog = true
    },
    async handleHideLead(leadId) {
      await this.hideLead(leadId)
    },
  },
}
</script>

<template>
  <div>
    <h1>Received Leads</h1>
    <VDataTable
      :headers="headers"
      :items="leads"
      item-value="name"
    >
      <template #item="{ item }">
        <tr>
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
            <VBtn
              icon
              small
              class="mini-btn"
              @click="handleHideLead(item.id)"
            >
              <VIcon small>
                mdi-eye-off
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
