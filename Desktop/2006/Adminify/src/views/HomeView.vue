<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list dense nav>
          <router-link to="/" tag="v-list-item" class="large-text">
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </router-link>
          <router-link to="/login" tag="v-list-item" class="large-text">
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </router-link>
          <router-link to="/signup" tag="v-list-item" class="large-text">
            <v-list-item-content>
              <v-list-item-title>Signup</v-list-item-title>
            </v-list-item-content>
          </router-link>
          <router-link to="/about" tag="v-list-item" class="large-text">
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <!-- Your main content here -->
        <router-view></router-view> <!-- This will render the matched component for the current route -->
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLayout', // Replace with your component name
  
  // You can add more properties or hooks here
  
});
</script>

<style scoped>
.large-text {
  font-size: 28px; /* Adjust this value as needed */
}
</style>
