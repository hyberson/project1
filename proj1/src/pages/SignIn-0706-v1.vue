<template>
      <q-page padding>
        <h3>User Settings</h3>
        <q-form @submit="updateSettings" class="q-gutter-md">
          <q-input filled v-model="name" label="Name" />
          <q-input filled v-model="phoneNumber" label="Phone Number" />
          <q-input filled v-model="password" label="New Password" type="password" aria-autocomplete="senha"/>
          <q-input filled v-model="confirmPassword" label="Confirm New Password" type="password" aria-autocomplete="confirme a senha"/>
          <q-btn label="Update Settings" type="submit" color="primary" />
        </q-form>
      </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'

let name = ref('')
let phoneNumber = ref('')
let password = ref('')
let confirmPassword = ref('')

const updateSettings = (evt) => {
  evt.preventDefault()
  
  if(password.value !== confirmPassword.value) {
    Notify.create({
      color: 'negative',
      message: 'Password and confirm password do not match.'
    })
    return
  }

  // Send the updated settings to the server.
  // This is where you would make your API call.
  console.log(`Name: ${name.value}`)
  console.log(`Phone Number: ${phoneNumber.value}`)
  console.log(`New Password: ${password.value}`)

  Notify.create('Settings Updated')
}
</script>
