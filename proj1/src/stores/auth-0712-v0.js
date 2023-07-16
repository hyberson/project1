import { defineStore } from 'pinia'
// import { createClient } from '@supabase/supabase-js'

/* const supabaseUrl = '<INSERT_SUPABASE_URL>'
const supabaseAnonKey = '<INSERT_SUPABASE_ANON_KEY>'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) */
import { supabase } from 'boot/supabase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    /* async login({ email, password }) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      })
      if (error) {
        throw error
      } else {
        this.setUser(user)
      }
    }, */
    async signInWithGoogle() {
      console.log('---------- signInWithGoogle')  
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
redirectTo: '/appointment-two/paramAppointmentDateTime',
      })
      if (error) {
        throw error
      } else {
        this.setUser(user)
      }
    },
    async logout() {
      await supabase.auth.signOut()
      this.setUser(null)
    },
    setUser(user) {
      this.user = user
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.user
    },
  },
  persist: {
    namespace: 'auth',
  },
})
