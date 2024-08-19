// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
    },
    fetchCurrentUser() {
      // Mock fetching user logic
      const user = { name: 'John Doe' } // Replace with actual fetch logic

      this.setCurrentUser(user)
    },
  },
})
