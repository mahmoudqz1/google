<script>
export default {
  data() {
    return {
      formData: {
        civilite: '',
        nom: '',
        prenom: '',
        datenaissance: '',
        profession: '',
        telephone: '',
        email: '',
        adresse: '',
        type_assurance: '',
        bonus_malus: '',
        mois_assurances: '',
        motif_resiliation: '',
        sinistre_materiel_responsable: '',
        sinistre_materiel_non_responsable: '',
        sinistre_corporel_responsable: '',
        sinistre_corporel_non_responsable: '',
        bris_glace: '',
        vol: '',
        suspension_alcoolemie: '',
        suspension_stupefiants: '',
        suspension_perte_points: '',
        annulation_permis: '',
        mois_suspension: '',
        marque: '',
        modele: '',
        puissance_fiscale: '',
        mise_en_circulation: '',
        immatriculation: '',
        usage: '',
      },
    }
  },
  methods: {
    saveFormData() {
      const civilite = this.formData.civilite.trim()
      const nom = this.formData.nom.trim()
      const prenom = this.formData.prenom.trim()
      const datenaissance = this.formData.datenaissance.trim()
      const profession = this.formData.profession.trim()
      const telephone = this.formData.telephone.trim()
      const email = this.formData.email.trim()
      const adresse = this.formData.adresse.trim()
      const type_assurance = this.formData.type_assurance.trim()
      const bonus_malus = this.formData.bonus_malus.trim()
      const mois_assurances = this.formData.mois_assurances.trim()
      const motif_resiliation = this.formData.motif_resiliation.trim()
      const sinistre_materiel_responsable = this.formData.sinistre_materiel_responsable.trim()
      const sinistre_materiel_non_responsable = this.formData.sinistre_materiel_non_responsable.trim()
      const sinistre_corporel_responsable = this.formData.sinistre_corporel_responsable.trim()
      const sinistre_corporel_non_responsable = this.formData.sinistre_corporel_non_responsable.trim()
      const bris_glace = this.formData.bris_glace.trim()
      const vol = this.formData.vol.trim()
      const suspension_alcoolemie = this.formData.suspension_alcoolemie.trim()
      const suspension_stupefiants = this.formData.suspension_stupefiants.trim()
      const suspension_perte_points = this.formData.suspension_perte_points.trim()
      const annulation_permis = this.formData.annulation_permis.trim()
      const mois_suspension = this.formData.mois_suspension.trim()
      const marque = this.formData.marque.trim()
      const modele = this.formData.modele.trim()
      const puissance_fiscale = this.formData.puissance_fiscale.trim()
      const mise_en_circulation = this.formData.mise_en_circulation.trim()
      const immatriculation = this.formData.immatriculation.trim()
      const usage = this.formData.usage.trim()

      // Add more fields as needed and retrieve their values similarly

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">

<head>

<p>Civilité : <span>${civilite}</span></p>
<span>${nom} ${prenom} ${datenaissance} ${profession} ${telephone} ${email} ${adresse} ${type_assurance} ${bonus_malus} ${mois_assurances} ${motif_resiliation} ${sinistre_materiel_responsable} ${sinistre_materiel_non_responsable} ${sinistre_corporel_responsable} ${sinistre_corporel_non_responsable} ${bris_glace} ${vol} ${suspension_alcoolemie} ${suspension_stupefiants} ${suspension_perte_points} ${annulation_permis} ${mois_suspension} ${marque} ${modele} ${puissance_fiscale} ${mise_en_circulation} ${immatriculation} ${usage}</span>


</body>

</html>
      `

      // Create a Blob containing the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' })

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)

      // Create an <a> element to trigger the download
      const a = document.createElement('a')

      a.href = url
      a.download = 'auto_moto_form_data.html'

      // Append the <a> element to the body and trigger the download
      document.body.appendChild(a)
      a.click()

      // Clean up: remove the <a> element and revoke the URL
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
  },
}
</script>

<template>
  <div>
    <h1>Auto Moto Form</h1>

    <div class="form-group">
      <label for="civilite">Civilité:</label>
      <input
        id="civilite"
        v-model="formData.civilite"
        type="text"
        required
      >
      <label for="nom">nom:</label>
      <input
        id="nom"
        v-model="formData.nom"
        type="text"
        required
      >
    </div>

    <!-- Add more form fields as needed -->

    <button @click="saveFormData">
      Save
    </button>
  </div>
</template>

<style scoped>
/* Add scoped styles here */
</style>
