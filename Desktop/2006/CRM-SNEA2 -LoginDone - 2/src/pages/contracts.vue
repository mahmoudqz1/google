<script setup lang="ts">
const source = [
  {
    source: 's',
    nom: 'Yogurt',
    prenom: 'ogurt',
    telephone: 'Yogurt',
    postale: 'Yogurt',
    usage: 'Yogurt',
    permis: 'Yogurt',
  },
]
</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase">
          source
        </th>
        <th>
          nom
        </th>
        <th>
          prenom
        </th>
        <th>
          telephone
        </th>
        <th>
          postale
        </th>
        <th>
          usage
        </th>
        <th>
          permis
        </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="item in desserts"
        :key="item.dessert"
      >
        <td>
          {{ item.source }}
        </td>
        <td class="text-center">
          {{ item.nom }}
        </td>
        <td class="text-center">
          {{ item.prenom }}
        </td>
        <td class="text-center">
          {{ item.telephone }}
        </td>
        <td class="text-center">
          {{ item.postale }}
        </td>
        <td class="text-center">
          {{ item.usage }}
        </td>
        <td class="text-center">
          {{ item.permis }}
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
