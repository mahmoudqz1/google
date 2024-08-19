<template>
    <v-app>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <!-- Other content here -->
          </v-col>
          <v-col cols="auto">
            <v-btn density="compact" icon large @click="showForm = !showForm">
              <v-icon size="32">{{ showForm ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showForm" class="mt-4">
          <v-col cols="12">
            <form @submit.prevent="submit">
              <v-text-field
                v-model="form.name"
                :counter="10"
                :error-messages="errors.name"
                label="Name"
              ></v-text-field>
  
              <v-text-field
                v-model="form.phone"
                :counter="10"
                :error-messages="errors.phone"
                label="Phone Number"
              ></v-text-field>
  
              <v-text-field
                v-model="form.email"
                :error-messages="errors.email"
                label="E-mail"
              ></v-text-field>
  
              <v-select
                v-model="form.select"
                :error-messages="errors.select"
                :items="items"
                label="Select"
              ></v-select>
  
              <v-checkbox
                v-model="form.checkbox"
                :error-messages="errors.checkbox"
                label="Option"
                value="1"
              ></v-checkbox>
  
              <v-btn class="me-4" type="submit">
                Submit
              </v-btn>
  
              <v-btn @click="handleReset">
                Clear
              </v-btn>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    name: 'LeadsView',
    setup() {
      const showForm = ref(false)
  
      const form = ref({
        name: '',
        phone: '',
        email: '',
        select: null,
        checkbox: false,
      })
  
      const errors = ref({
        name: '',
        phone: '',
        email: '',
        select: '',
        checkbox: '',
      })
  
      const items = ref(['VTC', 'AUTO', 'MOTO', 'CARAVANE'])
  
      const validate = () => {
        let isValid = true
  
        // Name validation
        if (form.value.name.length < 2) {
          errors.value.name = 'Name needs to be at least 2 characters.'
          isValid = false
        } else {
          errors.value.name = ''
        }
  
        // Phone validation
        if (form.value.phone.length < 9 || !/^[0-9-]+$/.test(form.value.phone)) {
          errors.value.phone = 'Phone number needs to be at least 9 digits.'
          isValid = false
        } else {
          errors.value.phone = ''
        }
  
        // Email validation
        if (!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(form.value.email)) {
          errors.value.email = 'Must be a valid e-mail.'
          isValid = false
        } else {
          errors.value.email = ''
        }
  
        // Select validation
        if (!form.value.select) {
          errors.value.select = 'Select an item.'
          isValid = false
        } else {
          errors.value.select = ''
        }
  
        // Checkbox validation
        if (!form.value.checkbox) {
          errors.value.checkbox = 'Must be checked.'
          isValid = false
        } else {
          errors.value.checkbox = ''
        }
  
        return isValid
      }
  
      const submit = () => {
        if (validate()) {
          alert(JSON.stringify(form.value, null, 2))
          showForm.value = false // Hide form after submission
        }
      }
  
      const handleReset = () => {
        form.value = {
          name: '',
          phone: '',
          email: '',
          select: null,
          checkbox: false,
        }
        errors.value = {
          name: '',
          phone: '',
          email: '',
          select: '',
          checkbox: '',
        }
      }
  
      return {
        showForm,
        form,
        errors,
        items,
        submit,
        handleReset,
      }
    },
  }
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  