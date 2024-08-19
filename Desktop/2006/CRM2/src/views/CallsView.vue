<template>
  <v-container>
    <v-data-table v-if="leads.length > 0" :headers="headers" :items="leads" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Leads</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="callNumber(item.Tel)">mdi-phone</v-icon>
      </template>
    </v-data-table>
    <div v-else>No data available</div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      leads: [],
      headers: [
        { text: 'From', value: 'from' },
        { text: 'To', value: 'to' },
        { text: 'CC', value: 'cc' },
        { text: 'Subject', value: 'subject' },
        { text: 'Time', value: 'time' },
        { text: 'Date de naissance', value: 'date_de_naissance' },
        { text: 'Nom', value: 'Nom' },
        { text: 'Prénom', value: 'Prenom' },
        { text: 'E-mail', value: 'EmailID' },
        { text: 'Tél', value: 'Tel' },
        { text: 'Code postale', value: 'Code_postale' },
        { text: 'Type d\'usage', value: 'Type_usage' },
        { text: 'Type de permis', value: 'Type_de_permis' },
        { text: 'Action', value: 'actions', sortable: false }
      ]
    };
  },
  created() {
    this.fetchLeads();
  },
  methods: {
    async fetchLeads() {
      try {
        const response = await fetch('/leads.json'); 
        const data = await response.json();


        const leads = data.slice(1).map(row => {
          return {
            from: row[0],
            to: row[1],
            cc: row[2],
            subject: row[3],
            time: row[4],
            date_de_naissance: row[5],
            Nom: row[6],
            Prenom: row[7],
            EmailID: row[8],
            Tel: row[9],
            Code_postale: row[10],
            Type_usage: row[11],
            Type_de_permis: row[12],
            phone: row[9] 
          };
        });

        this.leads = leads;
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    },
    callNumber(phoneNumber) {
      // Example: Replace with actual Aircall API integration code
      // For example, open Aircall website with phone number as parameter
      window.open(`https://app.aircall.io/call/${phoneNumber}`, '_blank');
    }
  }
};
</script>

<style scoped>

</style>
