<script>
import AircallPhone from 'aircall-everywhere'

export default {
  name: 'AircallIntegrationPage',
  data() {
    return {
      // From Code 1
      phone: null,
      phoneVisible: false,

      // From Code 2
      calls: [],
      allCallsToday: [],
      filteredCalls: [],
      pagination: {
        current_page: 1,
        next_page_link: null,
        previous_page_link: null,
        total: 0,
        per_page: 20,
      },
      currentPage: 1,
      totalFilteredPages: 1,
      totalCallsToday: 0,
      totalInboundCallsToday: 0,
      totalOutboundCallsToday: 0,
      intermediateCount: 0,
      searchQuery: '',
      dialog: false,
      dialogCall: null,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredCalls.length / this.pagination.per_page)
    },
    paginatedCalls() {
      const start = (this.currentPage - 1) * this.pagination.per_page

      return this.filteredCalls.slice(start, start + this.pagination.per_page)
    },
  },
  mounted() {
    this.initializePhone() // Initialize phone from Code 1
    this.fetchAllCallsToday() // Fetch calls from Code 2
  },
  methods: {
    // Methods from Code 1
    initializePhone() {
      if (!this.phone) {
        this.phone = new AircallPhone({
          domToLoadPhone: '#phone',
          onLogin: settings => {
            console.log('User logged in:', settings)
          },
          onLogout: () => {
            console.log('User logged out')
          },
        })

        this.phone.on('incoming_call', callInfos => {
          console.log('Incoming call:', callInfos)
        })

        this.phone.on('call_ended', callInfos => {
          console.log('Call ended:', callInfos)
        })
      }
    },
    togglePhoneVisibility() {
      this.phoneVisible = !this.phoneVisible
    },

    // Methods from Code 2
    async fetchAllCallsToday() {
      try {
        const today = new Date()

        today.setHours(0, 0, 0, 0)

        const startOfDay = Math.floor(today.getTime() / 1000)

        console.log('Start of Day (UNIX timestamp):', startOfDay)

        let currentPage = 1
        let callsToday = []
        let inboundCallsToday = 0
        let outboundCallsToday = 0

        while (true) {
          console.log(`Fetching all calls for page: ${currentPage}`)

          const response = await fetch(`https://api.aircall.io/v1/calls?page=${currentPage}&order=desc`, {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${btoa('13aec6a05d57d14406558c002d2cec1b:e58b1514878bea4326682bc7564e8ffb')}`,
              'Content-Type': 'application/json',
            },
          })

          const data = await response.json()

          const calls = data.calls.filter(call => {
            console.log('Checking call:', call.id, 'started_at:', call.started_at, '>=', startOfDay)

            return call.started_at >= startOfDay
          })

          if (calls.length === 0)
            break

          calls.forEach(call => {
            if (call.direction === 'inbound')
              inboundCallsToday++
            else if (call.direction === 'outbound')
              outboundCallsToday++
          })

          callsToday = callsToday.concat(calls)
          this.intermediateCount = callsToday.length
          this.allCallsToday = callsToday
          this.filterCalls() // Update filtered calls
          console.log('Calls Today Count So Far:', callsToday.length)

          if (!data.meta.next_page_link)
            break

          currentPage++
        }

        this.totalCallsToday = callsToday.length
        this.totalInboundCallsToday = inboundCallsToday
        this.totalOutboundCallsToday = outboundCallsToday
        this.totalFilteredPages = Math.ceil(this.filteredCalls.length / this.pagination.per_page)
        console.log('Final Total Calls Today:', this.totalCallsToday)
        console.log('Final Total Inbound Calls Today:', this.totalInboundCallsToday)
        console.log('Final Total Outbound Calls Today:', this.totalOutboundCallsToday)
      }
      catch (error) {
        console.error('Error fetching all calls today:', error)
      }
    },
    filterCalls() {
      this.filteredCalls = this.allCallsToday.filter(call => {
        const userName = this.getUser(call).toLowerCase()

        return userName.includes(this.searchQuery.toLowerCase())
      })
      this.totalFilteredPages = Math.ceil(this.filteredCalls.length / this.pagination.per_page)
      this.currentPage = 1
    },
    previousPage() {
      if (this.currentPage > 1)
        this.currentPage--
    },
    nextPage() {
      if (this.currentPage < this.totalFilteredPages)
        this.currentPage++
    },
    formatDate(timestamp) {
      if (!timestamp || timestamp === 'no_available_agent')
        return 'N/A'
      const date = new Date(timestamp * 1000)

      return date.toLocaleString()
    },
    getUser(call) {
      return call.user ? call.user.name : 'Unknown'
    },
    openDialog(call) {
      this.dialogCall = call
      this.dialog = true
    },
  },
}
</script>

<template>
  <VContainer class="main-container">
    <!-- Phone Interface and Circle Button Section -->
    <div class="fixed-button-container">
      <div
        v-if="!phoneVisible"
        class="circle-button"
        @click="togglePhoneVisibility"
      >
        <VIcon
          class="call-icon"
          color="white"
        >
          mdi-phone
        </VIcon>
      </div>
      <VCard
        class="phone-container"
        :class="[{ 'slide-in': phoneVisible }]"
        outlined
      >
        <VCardActions class="minimize-action">
          <VBtn
            icon
            class="minimize-btn"
            @click="togglePhoneVisibility"
          >
            <VIcon>mdi-window-minimize</VIcon>
          </VBtn>
        </VCardActions>
        <div
          id="phone"
          class="phone-interface"
        >
          <iframe
            src="https://my.aircall.io/"
            frameborder="0"
            class="iframe-content"
          />
        </div>
      </VCard>
    </div>

    <!-- Call Summary Cards -->
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <VCard>
          <template #title>
            Calls Today Count So Far
          </template>
          <template #text>
            <h2>{{ intermediateCount }}</h2>
          </template>
        </VCard>
        <div class="text-center text-caption">
          Real-time count of calls being processed today
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VCard>
          <template #title>
            Total Inbound Calls Today
          </template>
          <template #text>
            <h2>{{ totalInboundCallsToday }}</h2>
          </template>
        </VCard>
        <div class="text-center text-caption">
          Total number of inbound calls received today
        </div>
      </VCol>

      <VCol
        cols="12"
        md="4"
      >
        <VCard>
          <template #title>
            Total Outbound Calls Today
          </template>
          <template #text>
            <h2>{{ totalOutboundCallsToday }}</h2>
          </template>
        </VCard>
        <div class="text-center text-caption">
          Total number of outbound calls made today
        </div>
      </VCol>
    </VRow>

    <!-- Search Bar -->
    <VCard class="mb-4">
      <VCardTitle>Search Calls by Name</VCardTitle>
      <VCardText>
        <VTextField
          v-model="searchQuery"
          label="Search by Name"
          clearable
          @input="filterCalls"
        />
      </VCardText>
    </VCard>

    <!-- Calls List -->
    <VCard>
      <VCardTitle>Calls List</VCardTitle>
      <VCardText>
        <VTable>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Direction
              </th>
              <th class="text-left">
                Status
              </th>
              <th class="text-left">
                Started At
              </th>
              <th class="text-left">
                Answered At
              </th>
              <th class="text-left">
                Duration
              </th>
              <th class="text-left">
                Number
              </th>
              <th class="text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="call in paginatedCalls"
              :key="call.id"
            >
              <td>{{ getUser(call) }}</td>
              <td>{{ call.direction }}</td>
              <td>{{ call.status }}</td>
              <td>{{ formatDate(call.started_at) }}</td>
              <td>{{ formatDate(call.answered_at) }}</td>
              <td>{{ call.duration }}s</td>
              <td>{{ call.number.digits }}</td>
              <td>
                <VBtn
                  small
                  @click.stop="openDialog(call)"
                >
                  Details
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          Previous
        </VBtn>
        <span>Page {{ currentPage }} of {{ totalFilteredPages }}</span>
        <VBtn
          :disabled="currentPage === totalFilteredPages"
          @click="nextPage"
        >
          Next
        </VBtn>
      </VCardActions>
    </VCard>

    <!-- Details Dialog -->
    <VDialog
      v-model="dialog"
      max-width="800px"
    >
      <VCard>
        <VCardTitle
          class="headline grey lighten-2"
          primary-title
        >
          {{ dialogCall ? getUser(dialogCall) : '' }} - Call Details
        </VCardTitle>
        <VCardText>
          <VContainer class="dialog-content">
            <h3 class="section-title">
              Call Details
            </h3>
            <VRow>
              <VCol cols="6">
                <p><strong>ID:</strong> {{ dialogCall ? dialogCall.id : '' }}</p>
              </VCol>
              <VCol cols="6">
                <p><strong>Direction:</strong> {{ dialogCall ? dialogCall.direction : '' }}</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <p><strong>Status:</strong> {{ dialogCall ? dialogCall.status : '' }}</p>
              </VCol>
              <VCol cols="6">
                <p><strong>Started At:</strong> {{ dialogCall ? formatDate(dialogCall.started_at) : '' }}</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <p><strong>Answered At:</strong> {{ dialogCall ? formatDate(dialogCall.answered_at) : '' }}</p>
              </VCol>
              <VCol cols="6">
                <p><strong>Duration:</strong> {{ dialogCall ? `${dialogCall.duration}s` : '' }}</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <p><strong>Number:</strong> {{ dialogCall ? dialogCall.number.digits : '' }}</p>
              </VCol>
            </VRow>

            <h3 class="section-title">
              User Details
            </h3>
            <VRow>
              <VCol cols="6">
                <p><strong>ID:</strong> {{ dialogCall && dialogCall.user ? dialogCall.user.id : '' }}</p>
              </VCol>
              <VCol cols="6">
                <p><strong>Name:</strong> {{ dialogCall && dialogCall.user ? dialogCall.user.name : 'Unknown' }}</p>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="6">
                <p><strong>Email:</strong> {{ dialogCall && dialogCall.user ? dialogCall.user.email : '' }}</p>
              </VCol>
              <VCol cols="6">
                <p><strong>Availability:</strong> {{ dialogCall && dialogCall.user ? dialogCall.user.availability : '' }}</p>
              </VCol>
            </VRow>

            <h3 class="section-title">
              Comments
            </h3>
            <VRow>
              <VCol cols="12">
                <p>{{ dialogCall && dialogCall.comments ? dialogCall.comments : 'No comments available' }}</p>
              </VCol>
            </VRow>

            <h3 class="section-title">
              Tags
            </h3>
            <VRow>
              <VCol cols="12">
                <p>{{ dialogCall && dialogCall.tags ? dialogCall.tags.join(', ') : 'No tags available' }}</p>
              </VCol>
            </VRow>

            <VRow v-if="dialogCall && dialogCall.recording">
              <VCol
                cols="12"
                class="text-center"
              >
                <h3 class="section-title">
                  Call Recording
                </h3>
                <audio
                  :src="dialogCall.recording"
                  controls
                />
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions class="justify-end">
          <VBtn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>

<style scoped>
.main-container {
  background-color: #f5f5f5;
  padding: 30px;
}

.fixed-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.circle-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #00c853;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.call-icon {
  font-size: 20px;
}

.phone-container {
  width: 400px;
  height: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.phone-container.slide-in {
  transform: translateY(0);
}

.phone-interface {
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
}

.minimize-action {
  justify-content: flex-end;
  padding: 0;
  margin: 0;
}

.minimize-btn {
  background: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
}

.minimize-btn .v-icon {
  font-size: 20px;
}

.headline {
  font-weight: bold;
  font-size: 16px;
}

.section-title {
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

.dialog-content p {
  margin: 1px 0;
  font-size: 14px;
  line-height: 1.2;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}

.pagination span {
  margin: 0 10px;
}

.v-dialog--active .v-card {
  border-radius: 15px;
}

.v-card-title {
  padding: 16px;
  font-size: 18px;
}

.v-card-text {
  padding: 16px;
}

.v-card-actions {
  justify-content: flex-end;
  padding-right: 16px;
  padding-bottom: 8px;
}

.text-center {
  text-align: center;
}
</style>
