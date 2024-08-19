<script>
import AutoMotoForm from './AutoMotoForm.vue'
import HabitationForm from './HabitationForm.vue'

export default {
  components: {
    AutoMotoForm,
    HabitationForm,
  },
  data() {
    return {
      selectedForm: 'AUTO-MOTO',
      formOptions: ['AUTO-MOTO', 'HABITATION'],
    }
  },
}
</script>

<template>
  <VContainer>
    <h2 class="text-center">
      FICHE D’INFORMATIONS ET DE CONSEILS CONFORMEMENT AUX ARTICLES L 520-1. ET R 520-1 DU CODE DES ASSURANCES
    </h2>
    <VSelect
      v-model="selectedForm"
      :items="formOptions"
      label="Select Form"
    />
    <br><br>
    <div v-if="selectedForm === 'AUTO-MOTO'">
      <AutoMotoForm />
    </div>
    <div v-if="selectedForm === 'HABITATION'">
      <HabitationForm />
    </div>
  </VContainer>
</template>

<style scoped>
/* Add custom styles as needed */
</style>
