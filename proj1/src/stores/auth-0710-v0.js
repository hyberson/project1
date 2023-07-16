import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoading: false,
  }),
  actions: {
    async login(username, password) {
      this.isLoading = true

      // Here's where you'd normally fetch from your API
      // But for now, we're just going to mock the behavior
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === 'admin' && password === 'admin') {
            this.user = 'Maria Clara Gomes' // { name: 'Admin' }
            resolve()
          } else {
            reject(new Error('HBP ---- Invalid username or password'))
          }
          this.isLoading = false
        }, 1000)
      })
    },
    logout() {
      this.user = null
    },
  },
  getters: {
    isAuthenticated: state => Boolean(state.user),
  },
})
