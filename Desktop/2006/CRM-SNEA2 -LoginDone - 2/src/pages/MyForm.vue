<script>
import axios from '@axios'

export default {
  data() {
    return {
      data: {
        civilite: '',
        nom: '',
        prenom: '',
      },
      submitted: false,
      template: '',
      filledTemplate: '',
    }
  },
  created() {
    // Load the HTML template
    axios.get(require('@/pages/auto_template.html'))
      .then(response => {
        this.template = response.data
      })
      .catch(error => {
        console.error('Error loading template:', error)
      })
  },
  methods: {
    submitForm() {
      this.submitted = true
      this.filledTemplate = this.template
        .replace('{{civilite}}', this.data.civilite)
        .replace('{{nom}}', this.data.nom)
        .replace('{{prenom}}', this.data.prenom)
    },
    printPage() {
      const printWindow = window.open('', '', 'height=600,width=800')

      printWindow.document.write('<html><head><title>Print Form</title>')
      printWindow.document.write('</head><body>')
      printWindow.document.write(this.filledTemplate)
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    },
  },
}
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <label>Civilité:</label>
      <input
        v-model="data.civilite"
        type="text"
      >

      <label>Nom:</label>
      <input
        v-model="data.nom"
        type="text"
      >

      <label>Prénom:</label>
      <input
        v-model="data.prenom"
        type="text"
      >

      <button type="submit">
        Submit
      </button>
    </form>

    <div v-if="submitted">
      <h2>Form Details</h2>
      <div v-html="filledTemplate" />
      <button @click="printPage">
        Print
      </button>
    </div>
  </div>
</template>

  <style>
  form {
    margin-bottom: 20px;
  }
  </style>
