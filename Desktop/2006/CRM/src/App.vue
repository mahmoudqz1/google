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

<template>
  <v-app>
    <v-toolbar
      image=""
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

<v-toolbar>
  <v-toolbar-title class="d-flex justify-center align-center">
    <RouterLink to="/" class="d-flex align-center">
      <img src="https://media.licdn.com/dms/image/C4E0BAQFDKshivKXDQg/company-logo_200_200/0/1674205027627/carrez_conseil_assurances_logo?e=2147483647&v=beta&t=ylNCh818HmWot8_gNgEsKfCeWcG8iTN32sRFX9L4Fbg" alt="Logo" style="height: 40px; margin-right: 10px;">Carrez Conseil</RouterLink>
  </v-toolbar-title>
</v-toolbar>
      <v-spacer></v-spacer>

      <v-btn icon @click="changeTheme">
        <v-icon
          :icon="darkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        ></v-icon>
      </v-btn>
      <v-btn variant="outlined" to="/login" size="small" text="Login"> </v-btn>
    </v-toolbar>

    <v-main>
      <v-fade-transition>
        <RouterView />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>