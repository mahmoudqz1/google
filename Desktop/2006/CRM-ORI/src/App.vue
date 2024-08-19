<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex'
import { hexToRgb } from '@layouts/utils'

const { global } = useTheme()

const store = useStore()
const isUserFetched = ref(false)

onMounted(async () => {
  await store.dispatch('fetchCurrentUser')
  isUserFetched.value = true
})
</script>

<template>
  <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
    <RouterView v-if="isUserFetched" />
  </VApp>
</template>
