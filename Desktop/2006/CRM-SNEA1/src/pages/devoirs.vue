<script>
export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
  }),

  computed: {
    timeline() {
      return this.events.slice().reverse()
    },
  },

  methods: {
    comment() {
      const time = (new Date()).toTimeString()

      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        }),
      })

      this.input = null
    },
  },
}
</script>

<template>
  <VContainer style="max-width: 600px;">
    <VTimeline
      density="compact"
      side="end"
    >
      <VTimelineItem
        class="mb-12"
        dot-color="orange"
        size="large"
        fill-dot
      >
        <template #icon>
          <span>JL</span>
        </template>
        <VTextField
          v-model="input"
          density="compact"
          label="Leave a comment..."
          hide-details
          @keydown.enter="comment"
        >
          <template #append>
            <VBtn
              class="mx-0"
              variant="text"
              @click="comment"
            >
              Post
            </VBtn>
          </template>
        </VTextField>
      </VTimelineItem>
      <VSlideXTransition group>
        <VTimelineItem
          v-for="event in timeline"
          :key="event.id"
          class="mb-4"
          dot-color="pink"
          size="small"
        >
          <div class="d-flex justify-space-between flex-grow-1">
            <div>{{ event.text }}</div>
            <div class="flex-shrink-0">
              {{ event.time }}
            </div>
          </div>
        </VTimelineItem>
      </VSlideXTransition>
    </VTimeline>
  </VContainer>
</template>
