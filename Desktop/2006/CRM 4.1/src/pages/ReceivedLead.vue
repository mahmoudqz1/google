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
        { title: 'Type Assurance', key: 'type', align: 'start', sortable: false },
        { title: 'Nom', key: 'name', align: 'start', sortable: false },
        { title: 'Prénom', key: 'prenom', align: 'start', sortable: false },
        { title: 'E-mail', key: 'mail', align: 'start', sortable: false },
        { title: 'Téléphone', key: 'tel', align: 'start', sortable: false },
        { title: 'Actions', key: 'actions', align: 'center', sortable: false },
      ],
      showTimeline: false,
      showDocumentsDialog: false,
      showLeadDetailsDialog: false,
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
    ...mapActions(['hideLead', 'updateLeadStatus', 'moveLeadToGestion']),
    viewDetails(item) {
      this.currentLead = item
      this.showTimeline = true
    },
    openDocumentsDialog(item) {
      this.currentLead = item
      this.showDocumentsDialog = true
    },
    showLeadDetails(item) {
      this.currentLead = item
      this.showLeadDetailsDialog = true
    },
    async handleHideLead(leadId) {
      await this.hideLead(leadId)
    },
    async markAsDone(item) {
      // Update the status of the lead to "done"
      item.done = true

      // Call the Vuex action to persist the "done" status and move the lead
      await this.updateLeadStatus({ id: item.id, done: true })
      await this.moveLeadToGestion(item.id) // Move the lead to Gestion

      // Optionally navigate to Gestion.vue if required
      // router.push({ name: 'Gestion' });
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
      item-value="id"
    >
      <template #item="{ item }">
        <tr>
          <td>{{ item.type }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.prenom }}</td>
          <td>{{ item.mail }}</td>
          <td>{{ item.tel }}</td>
          <td class="actions-column">
            <VBtn
              v-if="!item.done"
              small
              class="mini-btn"
              color="success"
              @click="markAsDone(item)"
            >
              Done
            </VBtn>
            <VBtn
              v-if="!item.done"
              small
              class="mini-btn"
              @click="showLeadDetails(item)"
            >
              Details
            </VBtn>
            <VBtn
              v-if="!item.done"
              icon
              small
              class="mini-btn"
              @click="viewDetails(item)"
            >
              <VIcon class="small-icon">
                mdi-eye
              </VIcon>
            </VBtn>
            <VBtn
              v-if="!item.done"
              icon
              small
              class="mini-btn"
              @click="openDocumentsDialog(item)"
            >
              <VIcon class="small-icon">
                mdi-file-document
              </VIcon>
            </VBtn>
            <VBtn
              v-if="!item.done"
              icon
              small
              class="mini-btn"
              color="error"
              @click="handleHideLead(item.id)"
            >
              <VIcon class="small-icon">
                mdi-eye-off
              </VIcon>
            </VBtn>
            <VBtn
              v-else
              small
              class="mini-btn"
              color="success"
              disabled
            >
              Done
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
    <VDialog
      v-model="showLeadDetailsDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle class="headline grey lighten-2">
          Lead Details
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <VCol cols="12">
                <strong>Type Assurance:</strong> {{ currentLead?.type }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>Nom:</strong> {{ currentLead?.name }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>Prénom:</strong> {{ currentLead?.prenom }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>E-mail:</strong> {{ currentLead?.mail }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>Téléphone:</strong> {{ currentLead?.tel }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>Date de Naissance:</strong> {{ currentLead?.birth }}
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <strong>Code Postal:</strong> {{ currentLead?.postale }}
              </VCol>
              <VCol
                v-if="currentLead?.typeusage"
                cols="12"
                md="6"
              >
                <strong>Type:</strong> {{ currentLead?.typeusage }}
              </VCol>
              <VCol
                v-if="currentLead?.typepermis"
                cols="12"
                md="6"
              >
                <strong>Type de permis:</strong> {{ currentLead?.typepermis }}
              </VCol>
              <VCol
                v-if="currentLead?.typehabitation"
                cols="12"
                md="6"
              >
                <strong>Type d'habitation:</strong> {{ currentLead?.typehabitation }}
              </VCol>
              <VCol
                v-if="currentLead?.qualiteOccupation"
                cols="12"
                md="6"
              >
                <strong>Qualité d'occupation:</strong> {{ currentLead?.qualiteOccupation }}
              </VCol>
              <VCol
                v-if="currentLead?.typeConducteur"
                cols="12"
                md="6"
              >
                <strong>Type de conducteur:</strong> {{ currentLead?.typeConducteur }}
              </VCol>
              <VCol
                v-if="currentLead?.naturePret"
                cols="12"
                md="6"
              >
                <strong>Nature de prêt:</strong> {{ currentLead?.naturePret }}
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn
            color="red darken-1"
            text
            @click="showLeadDetailsDialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
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
  align-items: center;
  gap: 8px;
}

.v-btn.small.mini-btn {
  padding: 0;
  min-width: 24px;
  height: 24px;
  width: 24px;
}

.small-icon {
  font-size: 16px;
}
</style>
