<template>
  <v-card>
    <v-layout>
        <v-list
          density="compact"
          nav
        >
          <v-list-item
            :to="{ name: 'home' }"
            prepend-icon="mdi-home"
            title="HOME"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'leads' }"
            prepend-icon="mdi-account-group"
            title="LEADS"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'clients' }"
            prepend-icon="mdi-account-box"
            title="CLIENTS"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'devoirs' }"
            prepend-icon="mdi-briefcase"
            title="DEVOIRS DE CONSEIL"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'contracts' }"
            prepend-icon="mdi-file-document"
            title="CONTRACTS"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'calls' }"
            prepend-icon="mdi-phone"
            title="APPELLES"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'payments' }"
            prepend-icon="mdi-credit-card"
            title="PAIMENTS"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'users' }"
            prepend-icon="mdi-account-group"
            title="UTILISATEURS"
            class="large-text"
          ></v-list-item>
          <v-list-item
            :to="{ name: 'agents' }"
            prepend-icon="mdi-account-group"
            title="AGENTS"
            class="large-text"
          ></v-list-item>
        </v-list>
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
