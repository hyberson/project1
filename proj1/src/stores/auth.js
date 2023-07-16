// auth.js

import { supabase } from 'boot/supabase.js'
import { defineStore } from 'pinia'

// Listen for auth changes
/* supabase.auth.onAuthStateChange(async (event, session) => {
  console.log('--- auth --- session --- ', session)
  // Save session in Supabase
  if (session !== undefined && session !== null) { // ???????????
    // Now we know that foo is defined, we are good to go.
    
    await supabase.auth.setAuth(session.access_token)

    //const store = useAuthStore()
    const auth = useAuthStore() // ????????

    // Update Pinia store
    if (session) {
      auth.user = session.user
    } else {
      auth.user = null 
    }

  }  

}) */

// Create the store
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  getters: {
    getUser() {
      return this.user
    },

    getUserName() {
     return this.user?.user_metadata?.full_name 
    },

    getUserEmail() {
      return this.user?.email
    }
  },

actions: {

// Sign in with Google

async signInWithGoogle() {
    
  return new Promise((resolve, reject) => {

    supabase.auth.signInWithOAuth({
      provider: 'google' 
    }, 
    {
      onUser: () => resolve(true),
      onError: (err) => reject(err)  
    })

  })

},

    // Sign user out
    async signOut() {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        alert('Error signing out')
        return false
      } else {  
        alert('Signed out!')
        return true
      }
    }
  },
})

export default useAuthStore