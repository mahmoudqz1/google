<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Agents</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openAddDialog">Add Agent</v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="agents" item-key="id">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon class="me-2" size="small" @click="openEditDialog(item)">
                  mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteAgent(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add/Edit Dialog -->
    <v-dialog v-model="addDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ isEdit ? 'Edit' : 'Add' }} Agent</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newAgent.name" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newAgent.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newAgent.phone" label="Phone"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="isEdit ? updateAgent() : addAgent()">{{ isEdit ? 'Update' : 'Add' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      agents: [
        // Sample data
        { id: 1, name: 'SAAD JAAFRI', email: 's.jaafri@carrezconseil.fr', phone: '33526526253' },
        { id: 2, name: 'MILA GARCIA', email: 'm.garcia@carrezconseil.fr', phone: '33526526251' },
      ],
      addDialog: false,
      isEdit: false,
      newAgent: {
        id: null,
        name: '',
        email: '',
        phone: '',
      },
    };
  },
  methods: {
    openAddDialog() {
      this.isEdit = false;
      this.newAgent = { id: null, name: '', email: '', phone: '' };
      this.addDialog = true;
    },
    openEditDialog(agent) {
      this.isEdit = true;
      this.newAgent = { ...agent };
      this.addDialog = true;
    },
    addAgent() {
      this.agents.push({
        id: this.agents.length + 1,
        ...this.newAgent,
      });
      this.clearDialog();
    },
    updateAgent() {
      const index = this.agents.findIndex(agent => agent.id === this.newAgent.id);
      if (index !== -1) {
        this.agents.splice(index, 1, { ...this.newAgent });
      }
      this.clearDialog();
    },
    deleteAgent(agent) {
      const index = this.agents.findIndex(a => a.id === agent.id);
      if (index !== -1) {
        this.agents.splice(index, 1);
      }
    },
    clearDialog() {
      this.addDialog = false;
      this.newAgent = { id: null, name: '', email: '', phone: '' };
    },
  },
};
</script>
