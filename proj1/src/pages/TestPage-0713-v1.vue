<template>
<q-page-container>
 <q-page class="flex q-pa-md">

  <div v-if="auth.isAuthenticated">
    Welcome, you are logged in!
    <h6> {{ user }} </h6> 
    <q-btn label="Logout" @click="logout" />
  </div>
  <div v-else>
    You are not logged in!
    <q-btn label="Login" @click="signIn" />
  </div>
  
</q-page>
</q-page-container>
</template>

<script setup>

import { computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth'; // #hbp_model

const auth = useAuthStore();

onMounted(async () => {
  await auth.initializeUser()
});

const user = computed(() => auth.user)

console.log(' --- isAuthenticated --- ', auth.isAuthenticated)

const signIn = async () => {
  try {
    await auth.signInWithGoogle()
    console.log('Signed in successfully')
  } catch (error) {
    console.error('An error occurred while signing in: ' , error)
  }
}

const logout = async () => {
  try {
    await auth.logout()
  } catch (err) {
    console.error(err)
  }
}

</script>
