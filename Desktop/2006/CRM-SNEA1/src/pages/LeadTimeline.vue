<script>
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  props: ['leadId'],
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
  }),
  watch: {
    leadId: 'fetchComments',
  },
  mounted() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      if (!this.leadId)
        return
      try {
        const docRef = doc(db, 'Lead', this.leadId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const leadData = docSnap.data()

          this.events = leadData.comments || []
          console.log('Fetched comments for lead:', this.leadId, this.events)
        }
        else {
          console.error('No such document!')
        }
      }
      catch (error) {
        console.error('Error fetching comments:', error)
      }
    },
    async comment() {
      const time = new Date().toLocaleTimeString()

      const newComment = {
        id: this.nonce++,
        text: this.input,
        time,
      }

      try {
        const docRef = doc(db, 'Lead', this.leadId)

        await updateDoc(docRef, {
          comments: arrayUnion(newComment),
        })
        this.events.push(newComment)
        this.input = null
      }
      catch (error) {
        console.error('Error adding comment:', error)
      }
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
          label="Laissez un commentaire..."
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
          v-for="event in events"
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

<style scoped>
/* Styles for the timeline and comments */
.d-flex {
  display: flex;
}

.justify-space-between {
  justify-content: space-between;
}

.flex-grow-1 {
  flex-grow: 1;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.mb-12 {
  margin-bottom: 12px;
}

.mb-4 {
  margin-bottom: 4px;
}
</style>
