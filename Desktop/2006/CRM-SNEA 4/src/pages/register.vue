<script setup lang="ts">
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '../firebaseConfig'

const form = ref({
  name: '',
  email: '',
  password: '',
  role: '',
  privacyPolicies: false,
  showPassword: false, // Added this field
})

const isPasswordVisible = ref(false)
const router = useRouter()

// Define roles
const roles = ref(['Admin', 'Agent', 'Gestion'])

const registerUser = async () => {
  try {
    // Register user with Firebase Authentication
    const { email, password } = form.value
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const newUser = userCredential.user

    // Add additional user data to Firestore
    await setDoc(doc(db, 'users', newUser.uid), {
      uid: newUser.uid,
      name: form.value.name,
      email: form.value.email,
      password: form.value.password, // Storing the password (note: storing plain text passwords is generally not recommended)
      role: form.value.role,
      privacyPolicies: form.value.privacyPolicies,
      showPassword: form.value.showPassword, // Added this field
    })

    console.log('User registered with ID: ', newUser.uid)
    router.push('/')
  }
  catch (error) {
    console.error('Error registering user: ', error)
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <!-- Logo and Title -->
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img
              src="https://carrezconseil.fr/wp-content/uploads/2024/04/carrez-logo.png"
              alt="Carrez Conseil Logo"
              class="logo"
            >
          </div>
        </template>
        <VCardTitle class="text-2xl font-weight-bold">
          Carrez Conseil
        </VCardTitle>
      </VCardItem>

      <!-- Welcome Message -->
      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue chez carrez conseil
        </h5>
      </VCardText>

      <!-- Registration Form -->
      <VCardText>
        <VForm @submit.prevent="registerUser">
          <VRow>
            <!-- Name -->
            <VCol cols="12">
              <VTextField
                v-model="form.name"
                autofocus
                label="Name"
                placeholder="Johndoe"
              />
            </VCol>
            <!-- Email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>
            <!-- Password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <!-- Role Selection -->
            <VCol cols="12">
              <VSelect
                v-model="form.role"
                :items="roles"
                label="Role"
                required
              />
            </VCol>
            <!-- Privacy Policy Checkbox -->
            <VCol cols="12">
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel for="privacy-policy">
                  <span class="me-1">J'accepte</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >la politique de confidentialité</a>
                </VLabel>
              </div>
            </VCol>
            <!-- Sign Up Button -->
            <VCol cols="12">
              <VBtn
                block
                type="submit"
              >
                S'inscrire
              </VBtn>
            </VCol>
            <!-- Login Link -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Vous avez déjà un compte?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
                Connectez-vous
              </RouterLink>
            </VCol>
            <!-- Divider -->
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4" />
              <VDivider />
            </VCol>
            <!-- Auth Providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
