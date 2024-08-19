<script>
export default {
  data() {
    return {
      isFormValid: false,
      headers: [
        { text: 'Time of Day', value: 'a' },
        { text: 'Coffee', value: 'b' },
        { text: 'Milk', value: 'c' },
        { text: 'Tea', value: 'd' },
        { text: 'Time of Day', value: 'e' },
        { text: 'Coffee', value: 'f' },
        { text: 'Milk', value: 'i' },
        { text: 'Tea', value: 'g' },
        { text: 'Time of Day', value: 'h' },
        { text: 'Coffee', value: 'q' },
        { text: 'Milk', value: 'l' },
        { text: 'Tea', value: 'm' },
        { text: 'Time of Day', value: 'n' },
        { text: 'Coffee', value: 'o' },
        { text: 'Milk', value: 'p' },
        { text: 'Tea', value: 'q' },
      ],
      items: [
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
        { time: 'Morning', a: false, b: false, c: false, d: false, e: false, f: false, i: false, g: false, h: false, q: false, l: false, m: false, n: false, o: false, p: false, q: false },
      ],
    }
  },
  methods: {
    validate() {
      this.isFormValid = true
      for (const item of this.items) {
        if (!item.coffee && !item.milk && !item.tea) {
          this.isFormValid = false
          break
        }
      }
      if (this.isFormValid)
        alert('Form is valid!')
      else
        alert('Please select at least one checkbox for each time of day.')
    },
  },
}
</script>

<template>
  <VContainer>
    <VForm
      ref="form"
      v-model="isFormValid"
    >
      <VDataTable
        :headers="headers"
        :items="items"
        item-value="time"
        class="elevation-1"
        hide-default-footer
      >
        <template #[`item.coffee`]="{ item }">
          <VCheckbox
            v-model="item.coffee"
            label="Coffee"
          />
        </template>
        <template #[`item.milk`]="{ item }">
          <VCheckbox
            v-model="item.milk"
            label="Milk"
          />
        </template>
        <template #[`item.tea`]="{ item }">
          <VCheckbox
            v-model="item.tea"
            label="Tea"
          />
        </template>
      </VDataTable>
      <VBtn @click="validate">
        Validate
      </VBtn>
    </VForm>
  </VContainer>
</template>

<style scoped>
.v-data-table {
  max-width: 600px;
  margin: auto;
}
</style>
