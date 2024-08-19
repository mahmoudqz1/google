<template>
  <v-container fluid>
    <v-overlay :value="isLoading" class="align-center justify-center">
      <v-progress-circular v-if="isLoading" indeterminate color="white"></v-progress-circular>
    </v-overlay>
    <v-row justify="center">
      <v-col md="4">
        <v-card class="pa-4">
          <v-card-title class="text-center">Login Here</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="form.email"
                label="Email"
                prepend-inner-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :rules="[rules.required]"
                type="password"
              ></v-text-field>

              <v-checkbox v-model="form.remember" label="Remember Me" hide-details></v-checkbox>

              <v-btn color="primary" :loading="isLoading" type="submit" block>Login</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="text-center">
              <router-link to="/signup">Don't have an account? Sign up here</router-link>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/firebase"; // Assuming firebase.js is in src/firebase/
import { signInWithEmailAndPassword } from "firebase/auth";

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const isLoading = ref(false);

const rules = {
  required: (value: any) => !!value || "Required.",
  email: (value: any) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
};

const login = async () => {
  if (form.email === "" || form.password === "") {
    return;
  }

  isLoading.value = true;

  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);

    // Optional: Handle successful login, e.g., redirect to dashboard
    console.log("User logged in successfully");

    // Reset form and loading state
    form.email = "";
    form.password = "";
    form.remember = false;
    isLoading.value = false;
  } catch (error) {
    console.error("Error logging in:", error);
    isLoading.value = false;
  }
};
</script>
