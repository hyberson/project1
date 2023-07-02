<template>
    <q-page class="flex q-pa-md">
      <div class="text-h6">Test Page</div>   // Test page
      <q-space></q-space>
      <q-form @submit="submitForm" class="q-gutter-md">
        <div class="text-h6">{{ myRoute.value }}</div>
        <q-card>
        <q-card-section>
          <q-input filled v-model="myRoute" label="Route" />
        </q-card-section>
        <q-card-actions>
          <!-- <q-btn label="Testar" @click="$router.push('/provider-profile')" />  ${myRoute.value}` 6">{{ provider.name }}< -->
          <q-btn label="Testar" @click="$router.push('{{ myRoute.value }}')" /> 
           <!-- <q-btn label="Testar" @click="$router.push("'/'" & "'notauthenticated/agendamento'")" />  -->
        </q-card-actions>
      </q-card>
      </q-form>
    </q-page>
  </template>
 
<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'

let myRoute = ref('')

const submitForm = (evt) => {
  evt.preventDefault()

  // Send the updated settings to the server.
  // This is where you would make your API call.
  console.log(`Name: ${myRoute.value}`)

  Notify.create('Form submitted')
}
  </script>
  