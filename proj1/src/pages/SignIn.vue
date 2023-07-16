<template>
  <q-page-container>
    <q-page class="flex q-pa-md">
  <div class="login-container">
    <h2>Identifique-se</h2>
    
    <q-separator color="black" inset /> <br><br>
      <!-- <h4>Próximos passos</h4> -->
      <div>
       <font size="4"
          face="verdana"
          color="red">
          <strong>Para marcar uma consulta, você deverá se identificar.</strong> <br> <br>
      </font>
      </div>
    <button @click="login">Me identificar com a minha conta do Google</button>
    <p v-if="error">{{ error }}</p>
  </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

// useRoute and useRouter hooks give us access to the current route and router instance
const route = useRoute();
const router = useRouter();

const error = ref('');

const login = async () => {
  try {
    // Simulate a social login delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // After successful login
    if (route.query.redirect) {
      console.log('------ route.query.redirect ---- ', route.query.redirect);
      // const redirectUrl = decodeURIComponent(route.query.redirect.toString());
   //  const redirectUrl = route.query.redirect.toString(); // ???????????
   const redirectUrl = route.query.redirect; // ???????????
    console.log('------ redirectUrl --- ', redirectUrl);

      router.push(redirectUrl);
    } else {
      router.push({ name: 'default' });
    }
  } catch (err) {
    error.value = err.message || 'An error occurred during login';
  }
}

</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
}
</style>
