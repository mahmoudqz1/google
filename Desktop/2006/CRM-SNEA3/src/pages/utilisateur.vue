<script>
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebaseConfig'

export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [],
      roles: ['Admin', 'Agent', 'Gestion'],
      addDialog: false,
      isEdit: false,
      newUser: {
        id: null,
        name: '',
        email: '',
        password: '',
        role: '',
        showPassword: false,
      },
      showPassword: false,
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.name.toLowerCase().includes(this.search.toLowerCase())
        || user.email.toLowerCase().includes(this.search.toLowerCase())
        || user.role.toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
  async mounted() {
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))

        this.users = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      }
      catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    openAddDialog() {
      this.isEdit = false
      this.newUser = { id: null, name: '', email: '', password: '', role: '', showPassword: false }
      this.addDialog = true
    },
    openEditDialog(user) {
      this.isEdit = true
      this.newUser = { ...user }
      this.addDialog = true
    },
    async registerUser() {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, this.newUser.email, this.newUser.password)

        const userToAdd = {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password,
          role: this.newUser.role,
          showPassword: this.newUser.showPassword,
        }

        const docRef = await addDoc(collection(db, 'users'), userToAdd)

        this.users.push({ ...userToAdd, id: docRef.id })
        this.clearDialog()
      }
      catch (error) {
        console.error('Error registering user:', error)
      }
    },
    async updateUser() {
      try {
        const userRef = doc(db, 'users', this.newUser.id)

        await updateDoc(userRef, {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password,
          role: this.newUser.role,
          showPassword: this.newUser.showPassword,
        })

        const index = this.users.findIndex(user => user.id === this.newUser.id)
        if (index !== -1)
          this.users.splice(index, 1, { ...this.newUser })

        this.clearDialog()
      }
      catch (error) {
        console.error('Error updating user:', error)
      }
    },
    async deleteUser(user) {
      try {
        await deleteDoc(doc(db, 'users', user.id))

        const index = this.users.findIndex(u => u.id === user.id)
        if (index !== -1)
          this.users.splice(index, 1)
      }
      catch (error) {
        console.error('Error deleting user:', error)
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleUserPasswordVisibility(user) {
      user.showPassword = !user.showPassword
    },
    clearDialog() {
      this.newUser = { id: null, name: '', email: '', password: '', role: '', showPassword: false }
      this.addDialog = false
      this.showPassword = false
    },
  },
}
</script>

<template>
  <VContainer>
    <VCard>
      <VCardTitle>
        Users
        <VSpacer />
        <VBtn
          color="primary"
          @click="openAddDialog"
        >
          Add +
        </VBtn>
      </VCardTitle>
      <VCardText>
        <VTextField
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </VCardText>

      <VDataTable
        :headers="headers"
        :items="filteredUsers"
        :search="search"
        class="elevation-1"
      >
        <template #item.password="{ item }">
          <span>{{ item.showPassword ? item.password : '••••••' }}</span>
          <VIcon
            small
            class="ml-2"
            @click="toggleUserPasswordVisibility(item)"
          >
            {{ item.showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
          </VIcon>
        </template>
        <template #item.actions="{ item }">
          <VIcon
            small
            class="mr-2"
            @click="openEditDialog(item)"
          >
            mdi-pencil
          </VIcon>
          <VIcon
            small
            @click="deleteUser(item)"
          >
            mdi-delete
          </VIcon>
        </template>
      </VDataTable>
    </VCard>

    <VDialog
      v-model="addDialog"
      max-width="500px"
    >
      <VCard>
        <VCardTitle>{{ isEdit ? 'Edit User' : 'Add New User' }}</VCardTitle>
        <VCardText>
          <VForm @submit.prevent="isEdit ? updateUser() : registerUser()">
            <VTextField
              v-model="newUser.name"
              label="Name"
              required
            />
            <br>
            <VTextField
              v-model="newUser.email"
              label="Email"
              required
            />
            <br>
            <VTextField
              v-model="newUser.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              required
              @click:append="togglePasswordVisibility"
            />
            <br>
            <VSelect
              v-model="newUser.role"
              :items="roles"
              label="Role"
              required
            />
            <br>
            <VBtn
              v-if="!isEdit"
              color="primary"
              @click="registerUser"
            >
              Register
            </VBtn>
            <VBtn
              v-if="isEdit"
              type="submit"
              color="primary"
            >
              Update User
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<style>
/* Add any custom styles you need */
</style>
