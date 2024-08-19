import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    //
  },
})


<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          density="compact"
          nav
        >
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" class="large-text"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group" title="Leads" value="leads" class="large-text"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Clients" value="clients" class="large-text"></v-list-item>
        <v-list-item prepend-icon="mdi-briefcase" title="Devoirs de conseil" value="devoirs" class="large-text"></v-list-item>
        <v-list-item prepend-icon="mdi-file-document" title="Contracts" value="contracts" class="large-text"></v-list-item>
        <v-list-item prepend-icon="mdi-credit-card" title="Payments" value="payment" class="large-text"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh"></v-main>
    </v-layout>
  </v-card>
</template>

<style>
.large-text {
  font-size: 28px;
}
</style>