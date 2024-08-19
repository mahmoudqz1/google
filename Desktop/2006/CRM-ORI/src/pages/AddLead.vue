<script>
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  name: 'LeadsView',
  data() {
    return {
      valid: false,
      showDialog: false,
      formMode: 'add', // Can be 'add', 'edit', or 'details'
      selectedInsurance: '',
      insuranceTypes: ['AUTO', 'MOTO', 'HABITATION', 'VTC', 'EMPRUNTEUR'],
      lead: {
        id: '',
        name: '',
        prenom: '',
        birth: '',
        mail: '',
        postale: '',
        tel: '',
        type: '', // Use this field for the type of insurance
        typeusage: '',
        typepermis: '',
        typehabitation: '',
        qualiteOccupation: '',
        typeConducteur: '',
        naturePret: '',
      },
      headers: [
        { title: 'Type Assurance', key: 'type', align: 'start', sortable: false },
        { title: 'Nom', key: 'name' },
        { title: 'Prénom', key: 'prenom' },
        { title: 'Email', key: 'mail' },
        { title: 'Téléphone', key: 'tel' },
        { title: 'Actions', key: 'actions' },
      ],
      leads: [],
      emailRules: [
        value => !!value || 'E-mail is required.',
        value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      ],
    }
  },
  async created() {
    await this.fetchLeads()
  },
  methods: {
    async fetchLeads() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Lead'))

        this.leads = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log('Fetched leads:', this.leads)
      }
      catch (error) {
        console.error('Error fetching leads:', error)
      }
    },
    editMode(item) {
      this.formMode = 'edit'
      this.showDialog = true
      this.populateLeadData(item)
    },
    viewDetails(item) {
      this.formMode = 'details'
      this.showDialog = true
      this.populateLeadData(item)
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
    async addLead() {
      try {
        const docRef = await addDoc(collection(db, 'Lead'), {
          name: this.lead.name,
          prenom: this.lead.prenom,
          birth: this.lead.birth,
          mail: this.lead.mail,
          postale: this.lead.postale,
          tel: this.lead.tel,
          type: this.selectedInsurance,
          typeusage: this.lead.typeusage,
          typepermis: this.lead.typepermis,
          typehabitation: this.lead.typehabitation,
          qualiteOccupation: this.lead.qualiteOccupation,
          typeConducteur: this.lead.typeConducteur,
          naturePret: this.lead.naturePret,
        })

        console.log('Lead added with ID:', docRef.id)
        this.fetchLeads()
        this.resetForm()
        this.showDialog = false
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
          type: this.lead.type,
          typeusage: this.lead.typeusage,
          typepermis: this.lead.typepermis,
          typehabitation: this.lead.typehabitation,
          qualiteOccupation: this.lead.qualiteOccupation,
          typeConducteur: this.lead.typeConducteur,
          naturePret: this.lead.naturePret,
        })
        console.log('Lead updated with ID:', this.lead.id)
        this.fetchLeads()
        this.resetForm()
        this.showDialog = false
      }
      catch (error) {
        console.error('Error updating lead:', error)
      }
    },
    populateLeadData(item) {
      this.lead = { ...item }
      this.selectedInsurance = this.lead.type
    },
    cancelForm() {
      this.showDialog = false
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
        type: '',
        typeusage: '',
        typepermis: '',
        typehabitation: '',
        qualiteOccupation: '',
        typeConducteur: '',
        naturePret: '',
      }
      this.valid = false
      this.selectedInsurance = ''
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
        @click="showDialog = true; formMode = 'add'"
      >
        <VIcon>mdi-plus</VIcon>
      </VBtn>
    </div>

    <!-- Data Table for Displaying Leads -->
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
          <td class="action-column">
            <div class="action-buttons">
              <VBtn
                small
                @click="editMode(item)"
              >
                Modifier
              </VBtn>
              <VBtn
                small
                @click="viewDetails(item)"
              >
                Details
              </VBtn>
              <VBtn
                small
                color="error"
                @click="deleteLead(item)"
              >
                Supprimer
              </VBtn>
            </div>
          </td>
        </tr>
      </template>
    </VDataTable>

    <!-- Dialog for Adding/Editing/Viewing Lead Details -->
    <VDialog
      v-model="showDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle class="headline grey lighten-2">
          {{ formMode === 'add' ? 'Add Lead' : formMode === 'edit' ? 'Modify Lead' : 'Lead Details' }}
        </VCardTitle>
        <VCardText>
          <VForm v-model="valid">
            <VContainer>
              <!-- Display all details for 'details' mode -->
              <template v-if="formMode === 'details'">
                <VRow>
                  <VCol cols="12">
                    <strong>Type Assurance:</strong> {{ lead.type }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Nom:</strong> {{ lead.name }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Prénom:</strong> {{ lead.prenom }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>E-mail:</strong> {{ lead.mail }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Téléphone:</strong> {{ lead.tel }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Date de Naissance:</strong> {{ lead.birth }}
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Code Postal:</strong> {{ lead.postale }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'AUTO' || lead.type === 'MOTO'"
                    cols="12"
                    md="6"
                  >
                    <strong>Type Usage:</strong> {{ lead.typeusage }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'MOTO'"
                    cols="12"
                    md="6"
                  >
                    <strong>Type de permis:</strong> {{ lead.typepermis }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'HABITATION'"
                    cols="12"
                    md="6"
                  >
                    <strong>Type d'habitation:</strong> {{ lead.typehabitation }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'HABITATION'"
                    cols="12"
                    md="6"
                  >
                    <strong>Qualité d'occupation:</strong> {{ lead.qualiteOccupation }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'VTC'"
                    cols="12"
                    md="6"
                  >
                    <strong>Type de conducteur:</strong> {{ lead.typeConducteur }}
                  </VCol>
                  <VCol
                    v-if="lead.type === 'EMPRUNTEUR'"
                    cols="12"
                    md="6"
                  >
                    <strong>Nature de prêt:</strong> {{ lead.naturePret }}
                  </VCol>
                </VRow>
              </template>

              <!-- Editable form for 'add' and 'edit' modes -->
              <template v-else>
                <VRow>
                  <VCol cols="12">
                    <VSelect
                      v-model="selectedInsurance"
                      :items="insuranceTypes"
                      label="Type Assurance"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                </VRow>
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.name"
                      label="Nom"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.prenom"
                      label="Prénom"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.mail"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.tel"
                      label="Téléphone"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.birth"
                      label="Date de Naissance"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="lead.postale"
                      label="Code Postal"
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'AUTO' || selectedInsurance === 'MOTO'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.typeusage"
                      :items="['USAGE PRO', 'USAGE PRIVE']"
                      label="Type"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'MOTO'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.typepermis"
                      :items="['AM', 'BSR', 'A', 'A1', 'A2']"
                      label="Type de permis"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'HABITATION'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.typehabitation"
                      :items="['appartement', 'maison']"
                      label="Type d'habitation"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'HABITATION'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.qualiteOccupation"
                      :items="['locataire', 'proprietaire']"
                      label="Qualité d'occupation"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'VTC'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.typeConducteur"
                      :items="['MOINS D\'un an', 'de 1an à 5ans', '5ans et plus']"
                      label="Type de conducteur"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                  <VCol
                    v-if="selectedInsurance === 'EMPRUNTEUR'"
                    cols="12"
                    md="6"
                  >
                    <VSelect
                      v-model="lead.naturePret"
                      :items="['Nouveau prêt', 'prêt en cours']"
                      label="Nature de prêt"
                      dense
                      outlined
                      required
                    />
                  </VCol>
                </VRow>
              </template>
            </VContainer>
          </VForm>
        </VCardText>
        <VDivider />
        <VCardActions>
          <VSpacer />
          <VBtn
            v-if="formMode !== 'details'"
            color="red darken-1"
            text
            @click="cancelForm"
          >
            Cancel
          </VBtn>
          <VBtn
            v-if="formMode !== 'details'"
            color="green darken-1"
            text
            @click="formMode === 'add' ? addLead() : updateLead()"
          >
            {{ formMode === 'add' ? 'Add Lead' : 'Update Lead' }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style scoped>
.v-card-title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 15px;
}

.v-card-text {
  padding: 20px;
}

.v-card-actions {
  padding: 10px 15px;
}

.v-btn {
  font-weight: bold;
}

.v-card {
  border-radius: 12px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}

.v-divider {
  margin: 0 -15px;
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

.action-column {
  width: 150px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
