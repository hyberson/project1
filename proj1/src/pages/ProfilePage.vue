<template>
  <q-page-container>
    <q-page class="flex q-pa-md">

      <div class="text-h6">{{ provider.name }}</div>

      <q-space></q-space>
      <q-card>
        <q-card-section>
          <div>{{ provider.areaOfExpertise }}</div>
          <div>{{ provider.service }}</div>
          <div>{{ provider.address }}</div>
        </q-card-section>
        <q-card-actions>
          <q-btn label="Agendar ---" @click="toSlotSelection" /> 
        </q-card-actions>
      </q-card>
      
      <q-space></q-space>
      <q-img :src="provider.photo" :alt="provider.name" />

    <q-dialog v-model="showCookiesPopup" persistent>
        <q-card>
          <q-card-section>
            Nós utilizamos cookies.
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Estou ciente. Quero prosseguir." v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-page>
  </q-page-container>
</template>
 
<script setup>
import { ref } from 'vue'
  
//  import { useRoute, useRouter } from 'vue-router';
  import { useRouter } from 'vue-router';
  
  // const route = useRoute();
  const router = useRouter();
  
  let provider = {
    photo: '/src/assets/homem-de-terno.jpg',
    name: 'João Silva',
    areaOfExpertise: 'Consultor Senior',
    service: 'Tabajara Consultoria em Negócios',
    address: 'Rua da Glória, 171',
  }

  
  // Navigate to slot selection page
  const toSlotSelection = () => {
  // console.log('toSlotSelection');
    router.push({ name: 'SlotSelection' });
  };
  
  let showCookiesPopup = ref(false)  // #hbp modificar
  </script>
  