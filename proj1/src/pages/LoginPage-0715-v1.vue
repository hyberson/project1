<template>
<q-page-container>
    <q-page class="flex q-pa-md">
  <div v-if="isAuthenticated">
  <h3>{{ isAuthenticated }}</h3> <!-- --------------------  NEVER ---------------  -->
    <p>You are signed in as {{ user.email }}</p>
    <button @click="logout">Sign out</button>
  </div>
  <div v-else>
    <button @click="signInWithGoogle">Sign in with Google</button>
  </div>
  
  <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6"> ------- A sua tentativa de login não foi bem-sucedida. Por questões de segurança, só é possível
          reservar horários quando o usuário está devidamente identificado no sistema. Por gentileza ligue para
          o número xxxxxxxxxxx.</div>
      </q-card-section>
      <q-card-section>
        <q-btn label="Entendi" color="negative" @click="closePage" />
      </q-card-section>
    </q-card>
  </q-dialog>

</q-page>
</q-page-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

/* import { useStore } from 'pinia' 
//const store = useStore('auth') */
import { useAuthStore } from 'stores/auth.js'
const store = useAuthStore()

const router = useRouter()
const route = useRoute()
const showDialog = ref(false)

// const user = computed(() => store.user)
// const isAuthenticated = computed(() => store.isAuthenticated)
// console.log(' ------ store.$state.user ???????  ', store.$state.user)
// const isAuthenticated = computed(() => store.$state.user) // EEEEEERRRRRRRRRRRRRRRRRRRRRRR

const signInWithGoogle = async () => {
  try {
    await store.signInWithGoogle()
    const redirect = route.query.redirect || { name: 'default' }
   // const redirect = 'http://hyberson-ideal-meme-r7wr96w4gj9cp9xv-9000.preview.app.github.dev:9000/#/appointment-two/paramAppointmentDateTime'
  
    console.log(' ------ LoginPage  redirect ', redirect)  
    router.push(redirect) // ==================================================================
    // router.push()
  } catch (err) {
    console.error(err)
    showDialog.value = true
  }
}

const logout = async () => {
  try {
    await store.logout()
    const redirect = route.query.redirect || { name: 'default' }
    router.push(redirect)
  } catch (err) {
    console.error(err)
    showDialog.value = true
  }
}

const closePage = () => {
  showDialog.value = false
  // Close the window or navigate to a different page
  // window.close();
}
</script>
/* ===================================================

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

============================================ */