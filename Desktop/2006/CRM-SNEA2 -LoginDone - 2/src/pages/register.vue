<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'

const form = ref({
  name: '',
  email: '',
  password: '',
  role: '',
  privacyPolicies: false,
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
    const docRef = await addDoc(collection(db, 'users'), {
      uid: newUser.uid,
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      privacyPolicies: form.value.privacyPolicies,
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
        <!-- Your logo here -->
        <VCardTitle class="text-2xl font-weight-bold">
          CRM
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
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                  >privacy policy & terms</a>
                </VLabel>
              </div>
            </VCol>
            <!-- Sign Up Button -->
            <VCol cols="12">
              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>
            <!-- Login Link -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/login"
              >
                Sign in instead
              </RouterLink>
            </VCol>
            <!-- Divider -->
            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
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
