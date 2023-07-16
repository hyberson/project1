<template>
<q-page-container>

  <q-page class="flex flex-center">
  
    <div v-if="userName">
      <p>Welcome {{ userName }}</p>
      <p>Email: {{ userEmail }}</p>
      <q-btn @click="handleLogout">Logout</q-btn>
    </div>
    <div v-else>
      <q-btn @click="handleLogin">Login with Google</q-btn> 
    </div>

  </q-page>
  
</q-page-container>

</template>

<script setup>

import { ref } from 'vue'
import { useQuasar } from 'quasar'  
// import { storeToRefs } from 'pinia'
import useAuthStore from '../stores/auth'

const $q = useQuasar()

const auth = useAuthStore()

const userName = ref(auth.getUserName)
const userEmail = ref(auth.getUserEmail)

/* if (user.value) {
  name.value = user.value.user_metadata.full_name
  email.value = user.value.email 
} */

async function handleLogin() {

  try {

    await auth.signInWithGoogle()
    
    // Sign in succeeded
    console.log('Sign in succeeded')

  } catch (error) {

    // Sign in failed
    $q.notify({
      message: 'Error signing in',
      color: 'negative'
    })

  }

}

async function handleLogout() {
  const success = await auth.signOut()

  if (!success) {
    $q.notify({
      message: 'Error signing out',
      color: 'negative' 
    })
  }
}

</script>
