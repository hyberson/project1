import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
  }),
  actions: {

    async init() {
      const { data: session, error } = await supabase.auth.getSession()
    
      if (error) {
        console.error('Error retrieving session:', error)
        return
      }
    
      this.setSession(session)
    
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        console.log('Auth state changed: ', event)
        this.setSession(newSession)
      })
    },
        
    async signInWithGoogle() {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      }) 

      if (error) {
        console.error('Error during Google sign in:', error)
        return { error }
      } 

      this.setUser(user)
      return { user }
    },
    
    async logout() {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Error during sign out:', error)
        return { error }
      }

      this.setUser(null)
      return { success: true }
    },

    setUser(user) {
      this.user = user
    },

    setSession(session) {
      this.session = session
      this.setUser(session ? session.user : null)
    },
  },
  
  getters: {
    isAuthenticated() {
      return !!this.user
    },
  },
})
