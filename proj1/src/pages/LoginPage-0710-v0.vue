<template>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="password" type="password" placeholder="Password">
      <button type="submit">Log In</button>
    </form>
  
    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">A sua tentativa de login não foi bem-sucedida. Por questões de segurança, só é possível 
            reservar horários quando o usuário está devidamente identificado no sistema. Por gentileza ligue para 
            o número xxxxxxxxxxx.</div>
        </q-card-section>
        <q-card-section>
<!--           <q-btn label="Ir para a página inicial" color="primary" @click="navigateToHome" />
          <q-btn label="Esolher um horário" color="secondary" @click="navigateToAppointment" />        -->
          <q-btn label="Entendi" color="negative" @click="closePage" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue' // Import watchEffect
  import { useAuthStore } from 'stores/auth.js'
  import { useRouter, useRoute } from 'vue-router'
  
  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const username = ref('')
  const password = ref('')
  const showDialog = ref(false)
  
  // Log changes to showDialog
  watchEffect(() => {
    console.log(`showDialog is now: ${showDialog.value}`)
  })
  
  const login = async () => {
    try {
      await auth.login(username.value, password.value)
      const redirect = route.query.redirect || { name: 'Index' }
      router.push(redirect)
    } catch (err) {
      console.error(err)
      showDialog.value = true
    }
  }
  
  // Actions for Dialog buttons
  /* const navigateToHome = () => {
    showDialog.value = false
    router.push({ name: 'Home' })
  }
  
  const navigateToAppointment = () => {
    showDialog.value = false
    router.push({ name: 'Appointment' })
  } */
  
  const closePage = () => {
    showDialog.value = false
    // Close the window or navigate to a different page
    // window.close();
  }
  
</script>
  