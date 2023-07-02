<template>
      <q-page padding>
        <h3>Sign in</h3>
        <q-form @submit="submitForm" class="q-gutter-md">
          <q-input filled v-model="name" label="Name" />
          <q-btn label="Sign in" type="submit" color="primary" />
        </q-form>
      </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'

let name = ref('')

const submitForm = (evt) => {
  evt.preventDefault()

  // Send the updated settings to the server.
  // This is where you would make your API call.
  console.log(`Name: ${name.value}`)

  Notify.create('Form submitted')
}
</script>
