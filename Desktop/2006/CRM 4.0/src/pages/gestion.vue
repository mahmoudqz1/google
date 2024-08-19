<script>
import { mapGetters } from 'vuex'
import AddDocuments from '@/pages/AddDocuments.vue'
import LeadTimeline from '@/pages/LeadTimeline.vue'

export default {
  name: 'GestionLeadsTable',
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
    ...mapGetters(['doneLeads']),
  },
  methods: {
    showLeadDetails(item) {
      this.currentLead = item
      this.showLeadDetailsDialog = true
    },
    viewDetails(item) {
      this.currentLead = item
      this.showTimeline = true
    },
    openDocumentsDialog(item) {
      this.currentLead = item
      this.showDocumentsDialog = true
    },
  },
}
</script>

<template>
  <div>
    <h1>Gestion des Leads</h1>
    <VDataTable
      :headers="headers"
      :items="doneLeads"
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
              small
              class="mini-btn"
              @click="showLeadDetails(item)"
            >
              Details
            </VBtn>
            <VBtn
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
              icon
              small
              class="mini-btn"
              @click="openDocumentsDialog(item)"
            >
              <VIcon class="small-icon">
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
