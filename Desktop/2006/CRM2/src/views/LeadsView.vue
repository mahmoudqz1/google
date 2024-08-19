<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Leads</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="exportToXLSX">
        Export
      </v-btn>
      <input type="file" ref="fileInput" style="display: none" @change="importFromXLSX" />
      <v-btn color="primary" dark @click="triggerFileInput">
        Import
      </v-btn>
      <v-btn color="primary" dark @click="openDialog">
        New Item
      </v-btn>
    </v-toolbar>

    <!-- Success Message Dialog -->
    <v-dialog v-model="showSuccessMessage" max-width="600">
      <v-sheet class="pa-4 text-center mx-auto" elevation="12" max-width="600" rounded="lg" width="100%">
        <v-icon class="mb-5" color="blue darken-1" icon="mdi-check-circle" size="112"></v-icon>
        <h2 class="text-h5 mb-6">Votre Lead a été créé avec succès</h2>
        <v-divider class="mb-4"></v-divider>
        <div class="text-end">
          <v-btn class="text-none" color="blue darken-1" variant="flat" width="90" rounded @click="hideSuccessMessage">
            Fait
          </v-btn>
        </div>
      </v-sheet>
    </v-dialog>

    <!-- New Item Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.tel" label="Tel"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.mail" label="E-mail"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.birth" label="Date de naissance"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.postale" label="Code postale"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.typeusage" label="Type d'usage"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="editedItem.typepermis" label="Type de permis"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" variant="text" @click="close">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Data Table -->
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      :footer-props="{
        'items-per-page-options': [5, 10, 15],
        'items-per-page-text': 'Items per page',
        'show-current-page': true,
        'show-first-last-page': true
      }"
      :items-per-page="itemsPerPage"
      :page="currentPage"
      @update:page="onPageChange"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Prénom', value: 'prenom' },
        { text: 'Tel', value: 'tel' },
        { text: 'E-mail', value: 'mail' },
        { text: 'Date de naissance', value: 'birth' },
        { text: 'Code postale', value: 'postale' },
        { text: 'Type d\'usage', value: 'typeusage' },
        { text: 'Type de permis', value: 'typepermis' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      desserts: [],
      currentPage: 1,
      itemsPerPage: 5,
      dialog: false,
      showSuccessMessage: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        prenom: '',
        tel: '',
        mail: '',
        birth: '',
        postale: '',
        typeusage: '',
        typepermis: ''
      }
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        // Update existing item
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        // Add new item
        this.desserts.push({ ...this.editedItem });
        this.showSuccessMessage = true;
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.resetEditedItem();
    },
    resetEditedItem() {
      this.editedItem = {
        name: '',
        prenom: '',
        tel: '',
        mail: '',
        birth: '',
        postale: '',
        typeusage: '',
        typepermis: ''
      };
      this.editedIndex = -1;
    },
    exportToXLSX() {
      const worksheet = XLSX.utils.json_to_sheet(this.desserts);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'leads.xlsx');
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    importFromXLSX(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          this.desserts = jsonData;
        };
        reader.readAsArrayBuffer(file);
      }
    },
    onPageChange(page) {
      this.currentPage = page;
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (index !== -1) {
        this.desserts.splice(index, 1);
      }
    },
    initialize() {
      this.desserts = [];
    },
    hideSuccessMessage() {
      this.showSuccessMessage = false;
    }
  }
};
</script>

<style>
/* Add your custom styles here */
</style>
