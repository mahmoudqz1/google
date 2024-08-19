<script setup lang="ts">
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { auth } from '@/firebaseConfig' // Adjust path as needed

console.log('Component Loaded') // Debug log

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const isPasswordVisible = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const login = async () => {
  console.log('Login function triggered') // Debug log

  if (form.value.email === '' || form.value.password === '') {
    errorMessage.value = 'Email and password are required'

    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await signInWithEmailAndPassword(auth, form.value.email, form.value.password)
    console.log('User logged in successfully') // Debug log

    // Redirect to home page or dashboard
    router.push('/')
  }
  catch (error) {
    errorMessage.value = 'Invalid email or password'
    console.error('Error logging in:', error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Carrez Conseil
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Bienvenue sur Carrez conseil! 👋🏻
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  label="Remember me"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  Forgot Password?
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                :loading="isLoading"
                block
                type="submit"
              >
                Login
              </VBtn>

              <!-- error message -->
              <VAlert
                v-if="errorMessage"
                type="error"
                class="mt-3"
              >
                {{ errorMessage }}
              </VAlert>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
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
