<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page padding>
        <h5>Agendamento</h5>
        <q-form @submit="submitForm" class="q-gutter-md">
          <q-calendar
            v-model="date"
            :events="events"
            event-color="primary"
          />
          <q-btn label="Agendar" type="submit" color="primary" />
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'

let date = ref(new Date())
let events = ref([]) // add events here if needed

const submitForm = (evt) => {
  evt.preventDefault()

  // Send the updated settings to the server.
  // This is where you would make your API call.
  console.log(`Date: ${date.value}`)

  Notify.create('Form submitted')
}
</script>
