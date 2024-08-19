<template>
    <v-container>
      <v-card>
        <v-card-title>
          Users
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="openAddDialog">Add +</v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-text>
  
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.password="{ item }">
            <span>{{ item.showPassword ? item.password : '••••••' }}</span>
            <v-icon small class="ml-2" @click="toggleUserPasswordVisibility(item)">
              {{ item.showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
            </v-icon>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openEditDialog(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
  
      <v-dialog v-model="addDialog" max-width="500px">
        <v-card>
          <v-card-title>{{ isEdit ? 'Edit User' : 'Add New User' }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="isEdit ? updateUser() : addUser()">
              <v-text-field v-model="newUser.id" label="ID" required></v-text-field>
              <v-text-field v-model="newUser.name" label="Name" required></v-text-field>
              <v-text-field v-model="newUser.email" label="Email" required></v-text-field>
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                v-model="newUser.password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="togglePasswordVisibility"
                required
              ></v-text-field>
              <v-select v-model="newUser.role" :items="roles" label="Role" required></v-select>
              <v-btn type="submit" color="primary">{{ isEdit ? 'Update User' : 'Add User' }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  <script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' }, // Added password to headers
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      users: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', password: '111333555', role: 'Admin', showPassword: false },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', password: '123456', role: 'User', showPassword: false },
        // Add more users as needed
      ],
      roles: ['Admin', 'User', 'Guest', 'Gestion'],
      addDialog: false,
      isEdit: false,
      newUser: {
        id: null,
        name: '',
        email: '',
        password: '',
        role: '',
        showPassword: false
      },
      showPassword: false
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase()) ||
        user.password.toLowerCase().includes(this.search.toLowerCase()) ||
        user.role.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    openAddDialog() {
      this.isEdit = false;
      this.newUser = { id: null, name: '', email: '', password: '', role: '', showPassword: false };
      this.addDialog = true;
    },
    openEditDialog(user) {
      this.isEdit = true;
      this.newUser = { ...user };
      this.addDialog = true;
    },
    addUser() {
      this.users.push({
        id: this.users.length + 1,
        ...this.newUser
      });
      this.clearDialog();
    },
    updateUser() {
      const index = this.users.findIndex(user => user.id === this.newUser.id);
      if (index !== -1) {
        this.users.splice(index, 1, { ...this.newUser });
      }
      this.clearDialog();
    },
    deleteUser(user) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleUserPasswordVisibility(user) {
      user.showPassword = !user.showPassword;
    },
    clearDialog() {
      this.newUser = { id: null, name: '', email: '', password: '', role: '', showPassword: false };
      this.addDialog = false;
      this.showPassword = false;
    }
  }
};
</script>
