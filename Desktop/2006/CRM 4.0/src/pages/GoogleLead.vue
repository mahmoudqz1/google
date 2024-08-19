<script>
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { fetchGoogleLeads } from '@/services/googleLeadsService'

export default {
  name: 'GoogleLead',
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
        typeusage: '', // This will hold the "Type" data from Google Script
        typepermis: '',
        typehabitation: '',
        qualiteOccupation: '',
        typeConducteur: '',
        naturePret: '',
        date: '', // New field for date and time
      },
      headers: [
        { title: 'Select', key: 'select', align: 'start', sortable: false }, // Select column on the left
        { title: 'Type Assurance', key: 'type', align: 'start', sortable: false },
        { title: 'Nom', key: 'name' },
        { title: 'Prénom', key: 'prenom' },
        { title: 'Email', key: 'mail' },
        { title: 'Téléphone', key: 'tel' },
        { title: 'Date & Heure', key: 'date' }, // New header for date and time
        { title: 'Actions', key: 'actions' },
      ],
      googleLeads: [],
      emailRules: [
        value => !!value || 'E-mail is required.',
        value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      ],
      selectAll: false, // Track the state of the "Select All" checkbox
      loading: false, // New loading state
    }
  },
  computed: {
    isAnyLeadSelected() {
      return this.googleLeads.some(lead => lead.selected)
    },
  },
  async created() {
    await this.fetchGoogleLeads()
  },
  methods: {
    async fetchGoogleLeads() {
      this.loading = true // Start loading
      try {
        // Fetch all leads from Google Sheets
        const data = await fetchGoogleLeads()

        // Fetch all leads already in Firebase
        const leadsQuery = query(collection(db, 'Lead'))
        const leadsSnapshot = await getDocs(leadsQuery)
        const existingLeads = leadsSnapshot.docs.map(doc => doc.data())

        // Filter out leads already in Firebase
        const newLeads = data.filter(row => {
          return !existingLeads.some(existingLead => existingLead.mail === row[4])
        })

        this.googleLeads = newLeads.map(row => ({
          type: row[0],
          date: new Date(row[1]), // Convert time string to Date object
          name: row[2],
          prenom: row[3],
          mail: row[4],
          tel: row[5],
          birth: row[6],
          postale: row[7],
          typeusage: row[13], // Assign "Type" column data to "typeusage"
          typepermis: row[9],
          typehabitation: row[10],
          qualiteOccupation: row[11],
          typeConducteur: row[12],
          naturePret: row[13],
          selected: false, // New field for selection
        }))

        // Sort leads by date, most recent first
        this.googleLeads.sort((a, b) => b.date - a.date)
        console.log('Fetched Google leads:', this.googleLeads)
      }
      catch (error) {
        console.error('Error fetching Google leads:', error)
      }
      finally {
        this.loading = false // End loading
      }
    },
    formatDateTime(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
      const formattedDate = date.toLocaleDateString('en-GB', options) // Format as DD/MM/YYYY
      const formattedTime = date.toLocaleTimeString('en-GB', { hour12: false }) // Format as HH:MM:SS

      return `${formattedDate} ${formattedTime}`
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
        // Implement delete logic for your app
        this.googleLeads = this.googleLeads.filter(lead => lead !== item)
        console.log('Lead deleted:', item)
      }
      catch (error) {
        console.error('Error deleting lead:', error)
      }
    },
    async addLead() {
      try {
        const newLead = {
          id: this.googleLeads.length + 1,
          name: this.lead.name,
          prenom: this.lead.prenom,
          birth: this.lead.birth,
          mail: this.lead.mail,
          tel: this.lead.tel,
          type: this.selectedInsurance,
          typeusage: this.lead.typeusage,
          typepermis: this.lead.typepermis,
          typehabitation: this.lead.typehabitation,
          qualiteOccupation: this.lead.qualiteOccupation,
          typeConducteur: this.lead.typeConducteur,
          naturePret: this.lead.naturePret,
          date: new Date(), // Set the current date and time
        }

        // Only include postale if the type is not AUTO
        if (this.selectedInsurance !== 'AUTO')
          newLead.postale = this.lead.postale

        this.googleLeads.push(newLead)
        this.googleLeads.sort((a, b) => b.date - a.date) // Sort by date after adding
        this.resetForm()
        this.showDialog = false
        console.log('Lead added:', newLead)
      }
      catch (error) {
        console.error('Error adding lead:', error)
      }
    },
    async updateLead() {
      try {
        const index = this.googleLeads.findIndex(lead => lead.id === this.lead.id)
        if (index !== -1) {
          this.lead.date = new Date() // Update the date to the current time
          if (this.selectedInsurance === 'AUTO')
            delete this.lead.postale // Remove postale if type is AUTO

          this.googleLeads.splice(index, 1, this.lead)
          this.googleLeads.sort((a, b) => b.date - a.date) // Sort by date after updating
          this.resetForm()
          this.showDialog = false
          console.log('Lead updated:', this.lead)
        }
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
        date: '',
      }
      this.valid = false
      this.selectedInsurance = ''
    },
    async addSelectedLeadsToFirebase() {
      try {
        const selectedLeads = this.googleLeads.filter(lead => lead.selected)
        for (const lead of selectedLeads) {
          const leadToSave = {
            name: lead.name,
            prenom: lead.prenom,
            birth: lead.birth,
            mail: lead.mail,
            tel: lead.tel,
            type: lead.type,
            typeusage: lead.typeusage,
            typepermis: lead.typepermis,
            typehabitation: lead.typehabitation,
            qualiteOccupation: lead.qualiteOccupation,
            typeConducteur: lead.typeConducteur,
            naturePret: lead.naturePret,
            date: lead.date,
          }

          if (lead.type !== 'AUTO')
            leadToSave.postale = lead.postale

          await addDoc(collection(db, 'Lead'), leadToSave)
        }

        // Remove the selected leads from the list
        this.googleLeads = this.googleLeads.filter(lead => !lead.selected)

        console.log('Selected leads added to Firebase and removed from the list.')
      }
      catch (error) {
        console.error('Error adding selected leads:', error)
      }
    },
    toggleSelectAll() {
      this.googleLeads.forEach(lead => {
        lead.selected = this.selectAll
      })
    },
  },
}
</script>

<template>
  <div>
    <h1>Google Leads</h1><br>

    <!-- Show the button only if any lead is selected -->
    <VBtn
      v-if="isAnyLeadSelected"
      color="primary"
      @click="addSelectedLeadsToFirebase"
    >
      Ajouter les leads sélectionnés
    </VBtn><br>
    <br>
    <VCheckbox
      v-model="selectAll"
      label="Select All"
      @change="toggleSelectAll"
    />

    <VDataTable
      :headers="headers"
      :items="googleLeads"
      class="elevation-1"
    >
      <!-- Custom content for no-data slot -->
      <template #no-data>
        <VProgressLinear
          v-if="loading"
          indeterminate
          :height="6"
        />
        <span v-else>No data available</span>
      </template>

      <template #item.select="{ item }">
        <VCheckbox v-model="item.selected" /> <!-- Checkbox for selection -->
      </template>
      <template #item.date="{ item }">
        {{ formatDateTime(item.date) }} <!-- Use the formatDateTime method to display formatted date & time -->
      </template>
      <template #item.actions="{ item }">
        <div class="action-buttons">
          <VBtn
            small
            class="action-btn"
            @click="viewDetails(item)"
          >
            Details
          </VBtn>
        </div>
      </template>
    </VDataTable>

    <VDialog
      v-model="showDialog"
      max-width="600px"
    >
      <VCard>
        <VCardTitle class="headline grey lighten-2">
          {{ formMode === 'add' ? 'Add Lead' : formMode === 'edit' ? 'Edit Lead' : 'Lead Details' }}
        </VCardTitle>
        <VCardText>
          <VForm v-model="valid">
            <VContainer>
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
                    v-if="lead.type !== 'AUTO'"
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
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <strong>Date & Heure:</strong> {{ formatDateTime(lead.date) }} <!-- Display date and time -->
                  </VCol>
                </VRow>
              </template>

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
                    v-if="selectedInsurance !== 'AUTO'"
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

.action-buttons {
  display: flex;
  justify-content: space-between;
}

.action-btn {
  min-width: 80px; /* Ensure consistent button width */
  text-align: center;
}
</style>
