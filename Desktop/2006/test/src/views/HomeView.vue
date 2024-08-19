<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        app
        dark
        permanent
        class="bg-light"
      >
        <v-list dense nav>
          <v-list-item to="/" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/leads" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Leads</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/clients" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Clients</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/devoirs" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-briefcase</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Devoirs de conseil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/contracts" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-file-document</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Contracts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/calls" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Calls</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/payments" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Payments</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/users" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/agents" link>
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-account-group</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Agents</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
import { RouterView } from 'vue-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
</script>

<style scoped>
/* Custom styles */
.v-list-item-content {
  display: flex;
  align-items: center;
}
.v-list-item-title {
  margin-left: 2px; /* Adjust the spacing between icon and text */
}
</style>
