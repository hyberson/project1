import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    
    async initializeUser() {
      const { data: session, error } = await supabase.auth.getSession()
    
      if (error) {
        console.error('Failed to get session', error)
        return
      }

     /*  if (session) {
         this.user = session.user
      } */

    if (session) {
      const { data: user } = await supabaseClient.auth.getUser()
      const userName = user.name
      console.log(`Hello, ${userName}!`)
    } else {
      console.log('User is not authenticated')
    }

    },

   /* const { data: session } = await supabaseClient.auth.getSession()

    if (session) {
      const { data: user } = await supabaseClient.auth.getUser()
      const userName = user.name
      console.log(`Hello, ${userName}!`)
    } else {
      console.log('User is not authenticated')
    } */


   async signInWithGoogle() {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })

      if (error) {
        console.error('auth.signInWithGoogle ERROR', error)
        throw error
      }

      this.user = user
    },
    
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },
  },
  getters: {
    // isAuthenticated() {
     // return !!this.user

     isAuthenticated() {

     if (session) {
      const { data: user } = supabaseClient.auth.getUser()
      const userName = user.name
      console.log(`Hello, ${userName}!`)
      return true
    } else {
      console.log('User is not authenticated')
      return false
    }

    },
  },
})
