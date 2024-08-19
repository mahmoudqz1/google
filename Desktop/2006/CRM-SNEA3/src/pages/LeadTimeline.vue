<script>
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

export default {
  props: ['lead'],
  data: () => ({
    events: [],
    input: null,
    nonce: 0,
  }),
  watch: {
    lead: 'fetchComments',
  },
  mounted() {
    this.fetchComments()
  },
  methods: {
    async fetchComments() {
      if (!this.lead || !this.lead.id) {
        console.warn('No lead ID provided.')

        return
      }

      try {
        const docRef = doc(db, 'Lead', this.lead.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const leadData = docSnap.data()

          console.log('Fetched lead data:', leadData)
          this.events = leadData.comments || []
          console.log('Fetched comments for lead:', this.lead.id, this.events)
        }
        else {
          // Initialize the document if it doesn't exist
          await setDoc(docRef, { comments: [] })
          this.events = []
          console.log('Initialized new document for lead:', this.lead.id)
        }
      }
      catch (error) {
        console.error('Error fetching comments:', error)
      }
    },
    async comment() {
      if (!this.input)
        return

      const now = new Date()

      const date = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })

      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })

      const newComment = {
        id: this.nonce++,
        text: this.input,
        date,
        time,
      }

      try {
        const docRef = doc(db, 'Lead', this.lead.id)

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
          v-for="event in events"
          :key="event.id"
          class="mb-4"
          dot-color="pink"
          size="small"
        >
          <div class="d-flex justify-space-between flex-grow-1">
            <div>{{ event.text }}</div>
            <div class="flex-shrink-0">
              {{ event.date }} {{ event.time }}
            </div>
          </div>
        </VTimelineItem>
      </VSlideXTransition>
    </VTimeline>
  </VContainer>
</template>

<style scoped>
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
