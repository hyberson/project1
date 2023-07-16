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
       console.log('---------- Im at auth.js signInWithGoogle')  
       /* const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
//        redirectTo: 'http://hyberson-ideal-meme-r7wr96w4gj9cp9xv-9000.preview.app.github.dev:9000/#/appointment-two/paramAppointmentDateTime',
      }) 
      // console.log('---------- AUTH.signInWithGoogle user ', user)
      if (error) {
        console.log('---------- AUTH.signInWithGoogle error')
        throw error
      } else {
        console.log('---------- AUTH.signInWithGoogle NOT IN error')
        this.setUser(user)
        // console.log('---------- AUTH.signInWithGoogle user ', user)
      } */
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
