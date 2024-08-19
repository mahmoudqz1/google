<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'name', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Leads</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="exportToXLSX">
          Export to XLSX
        </v-btn>
        <input type="file" ref="fileInput" style="display: none" @change="importFromXLSX" />
        <v-btn color="primary" dark @click="triggerFileInput">
          Import from XLSX
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.tel" label="Tel"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.mail" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.birth" label="Date de naissance"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.postale" label="Code postale"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.typeusage" label="Type d'usage"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.typepermis" label="Type de permis"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
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

  <!-- Success message template -->
  <v-dialog v-model="showSuccessMessage" max-width="600">
    <v-sheet class="pa-4 text-center mx-auto" elevation="12" max-width="600" rounded="lg" width="100%">
      <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>
      <h2 class="text-h5 mb-6">Votre Lead a été créé avec succès</h2>
      <v-divider class="mb-4"></v-divider>
      <div class="text-end">
        <v-btn class="text-none" color="success" variant="flat" width="90" rounded @click="hideSuccessMessage">
          Fait
        </v-btn>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      showSuccessMessage: false, // Added for success message visibility
      headers: [
        { title: 'Nom', key: 'name' },
        { title: 'Prénom', key: 'prenom' },
        { title: 'Tel', key: 'tel' },
        { title: 'E-mail', key: 'mail' },
        { title: 'Date de naissance', key: 'birth' },
        { title: 'Code postale', key: 'postale' },
        { title: 'Type d\'usage', key: 'typeusage' },
        { title: 'Type de permis', key: 'typepermis' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        prenom: '',
        tel: '',
        mail: '',
        birth: '',
        postale: '',
        typeusage: '',
        typepermis: '',
      },
      defaultItem: {
        name: '',
        prenom: '',
        tel: '',
        mail: '',
        birth: '',
        postale: '',
        typeusage: '',
        typepermis: '',
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push({ ...this.editedItem });
        this.showSuccessMessage = true; // Show success message
      }
      this.close();
    },

    hideSuccessMessage() {
      this.showSuccessMessage = false;
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
  },
};
</script>
