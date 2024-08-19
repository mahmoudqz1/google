<template>
  <div>
    <h1>Leads</h1>
    <v-data-table
      :headers="headers"
      :items="leads"
      item-value="name"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.data().name }}</td>
          <td>{{ item.data().prenom }}</td>
          <td>{{ item.data().birth }}</td>
          <td>{{ item.data().mail }}</td>
          <td>{{ item.data().postale }}</td>
          <td>{{ item.data().tel }}</td>
          <td>{{ item.data().typepermis }}</td>
          <td>{{ item.data().typeusage }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db } from '@/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'LeadsView',
  data() {
    return {
      headers: [
        { title: 'Name', key: 'name', align: 'start', sortable: false },
        { title: 'source', key: 'source' },
        { title: 'Prenom', key: 'prenom' },
        { title: 'Birth', key: 'birth' },
        { title: 'Email', key: 'mail' },
        { title: 'Postale', key: 'postale' },
        { title: 'Tel', key: 'tel' },
        { title: 'Type Permis', key: 'typepermis' },
        { title: 'Type Usage', key: 'typeusage' },
      ],
      leads: [],
    };
  },
  async created() {
    await this.fetchLeads();
  },
  methods: {
    async fetchLeads() {
      try {
        const querySnapshot = await getDocs(collection(db, 'Lead'));
        this.leads = querySnapshot.docs;
        console.log('Fetched leads:', this.leads); 
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>