<!-- LeadFormDialog.vue -->
<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Create Lead</v-btn>
      </template>
      <v-card>
        <v-card-title>Create New Lead</v-card-title>
        <v-card-text>
          <!-- Lead creation form -->
          <v-form @submit.prevent="submitForm">
            <v-text-field v-model="leadName" label="Lead Name"></v-text-field>
            <!-- Other form fields for lead details -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitForm">Save</v-btn>
          <v-btn @click="dialogVisible = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false,
        leadName: '',
        // Other fields for lead details
      };
    },
    methods: {
      submitForm() {
        // Handle form submission logic (e.g., API call to save lead)
        console.log('Saving lead:', this.leadName);
        // Reset form fields and close dialog
        this.leadName = '';
        this.dialogVisible = false;
      }
    }
  };
  </script>
  