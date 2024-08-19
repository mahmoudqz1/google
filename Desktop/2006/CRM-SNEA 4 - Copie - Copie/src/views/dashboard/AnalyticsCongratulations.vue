<script setup lang="ts">
import { useTheme } from 'vuetify'
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)
</script>

<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="12"
        order-sm="1"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            Bonjour Mahmoud! 🎉
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span>
            Depuis 6 ans Carrez Conseil le comparateur d'assurances, accompagne les Français dans leur choix d'assurance.
            <br>
            <br>
            Nous comprenons qu'il n'est pas toujours facile de comprendre le vocabulaire spécifique et les termes propres aux différents contrats d'assurance, que ce soit pour votre assurance auto, assurance moto, assurance habitation ou même votre mutuelle santé.
          </span>
          <br>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '175'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>
  </VCard>
</template>

  <style lang="scss" scoped>
  .john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
  }
  </style>
-->
