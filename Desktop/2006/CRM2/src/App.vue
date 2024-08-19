<template>
  <v-app>
    <v-app-bar
      app
      dark
      prominent
      color="primary"
    >
      <v-toolbar-title class="text-uppercase">
        <router-link to="/" class="d-flex align-center">
          <img src="https://media.licdn.com/dms/image/C4E0BAQFDKshivKXDQg/company-logo_200_200/0/1674205027627/carrez_conseil_assurances_logo?e=2147483647&v=beta&t=ylNCh818HmWot8_gNgEsKfCeWcG8iTN32sRFX9L4Fbg" alt="Logo" class="mr-2" style="height: 40px;">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined to="/login" text>Login</v-btn>
    </v-app-bar>

    <v-main>
      <v-fade-transition>
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { useTheme } from "vuetify";

const darkTheme = ref(true);
const theme = useTheme();

function changeTheme() {
  darkTheme.value = !darkTheme.value;
  theme.global.name.value = darkTheme.value ? "dark" : "light";
}
</script>

<style>

</style>
