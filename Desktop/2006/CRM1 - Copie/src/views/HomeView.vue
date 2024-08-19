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
          <v-list-item
            :to="{ name: 'home' }"
            prepend-icon="mdi-home"
            title="Home"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'leads' }"
            prepend-icon="mdi-account-group"
            title="Leads"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'clients' }"
            prepend-icon="mdi-account-box"
            title="Clients"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'devoirs' }"
            prepend-icon="mdi-briefcase"
            title="Devoirs de conseil"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'contracts' }"
            prepend-icon="mdi-file-document"
            title="Contracts"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'calls' }"
            prepend-icon="mdi-phone"
            title="calls"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'payments' }"
            prepend-icon="mdi-credit-card"
            title="Payments"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'users' }"
            prepend-icon="mdi-account-group"
            title="users"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'agents' }"
            prepend-icon="mdi-account-group"
            title="Agents"
            class="large-text"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style>
.large-text {
  font-size: 28px;
}
</style>
