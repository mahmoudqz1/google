<template>
  <v-container>
    <v-data-table :items="leads" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-btn @click="openAssignDialog(item)">Assign to Agent</v-btn>
      </template>
    </v-data-table>
    
    <v-dialog v-model="assignDialog" max-width="500px">
      <v-card>
        <v-card-title>Select Agent</v-card-title>
        <v-card-text>
          <v-select v-model="selectedAgent" :items="agents" item-text="name" item-value="id" label="Agent"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="assignAgent">Assign</v-btn>
          <v-btn @click="assignDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      leads: [
        { id: 1, name: 'Lead 1', agentId: null },
        { id: 2, name: 'Lead 2', agentId: null },
        { id: 3, name: 'Lead 3', agentId: null },
      ],
      agents: [
        { id: 1, name: 'Agent 1' },
        { id: 2, name: 'Agent 2' },
        { id: 3, name: 'Agent 3' },
      ],
      headers: [
        { text: 'Lead Name', value: 'name' },
        { text: 'Assigned Agent', value: 'assignedAgent' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      assignDialog: false,
      selectedLead: null,
      selectedAgent: null,
    };
  },
  methods: {
    openAssignDialog(lead) {
      this.selectedLead = lead;
      this.selectedAgent = null; // Reset selected agent
      this.assignDialog = true;
    },
    assignAgent() {
      if (this.selectedAgent && this.selectedLead) {
        this.selectedLead.agentId = this.selectedAgent.id;
        this.assignDialog = false;
      }
    },
    getAssignedAgentName(lead) {
      const agent = this.agents.find(agent => agent.id === lead.agentId);
      return agent ? agent.name : 'Not Assigned';
    }
  },
};
</script>

<style>
</style>
