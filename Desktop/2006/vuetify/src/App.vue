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
      image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <RouterLink to="/"> Carrez Conseil  </RouterLink>
      </v-toolbar-title>

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