<template>
  <q-page-container>
    <q-page class="flex q-pa-md">
      <div class="text-h6">{{ provider.name }}</div>
      <q-space></q-space>
      <q-img :src="provider.photo" :alt="provider.name" />
      <q-space></q-space>
      <q-card>
        <q-card-section>
          <div>{{ provider.areaOfExpertise }}</div>
          <div>{{ provider.service }}</div>
          <div>{{ provider.address }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Agendar uma conversa" @click="$router.push('/notauthenticated/agendamento')" />
        </q-card-actions>
      </q-card>
      <q-dialog v-model="showCookiesPopup" persistent>
        <q-card>
          <q-card-section>
            We use cookies to enhance your experience.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </q-page-container>
</template>
 
  <script setup>
  import { ref } from 'vue'
  
  let provider = {
    photo: '/src/assets/homem-de-terno.jpg',
    name: 'João Silva',
    areaOfExpertise: 'Consultor Senior',
    service: 'Tabajara Consultoria em Negócios',
    address: 'Rua da Glória, 123',
  }
  
  let showCookiesPopup = ref(true)
  </script>
  