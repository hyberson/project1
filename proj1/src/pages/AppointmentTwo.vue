<template>
<q-page-container>
    <q-page class="flex q-pa-md">
    <div class="q-pa-md">
      <h3>Appointment Two - Reserva de Horário</h3>
      <div>
        <p>Médico: {{ professionalName }}</p>
        <p>Especialidade: {{ areaOfExpertise }}</p>
        <p>Data e Horário: {{ appointmentDateTime }}</p>
        <p>Endereço: {{ officeAddress }}</p>
        
        <p>Modalidade: <strong>PARTICULAR</strong></p>
        <p>Preço da consulta: R$ 500,00 (quinhentos reais).</p>
      </div>
      
      <h4>Reserva em nome de</h4>
      <div>
        <!--<p>Nome: {{ auth.user }}</p>   -->
        <p>{{ auth.user }}</p>
        <p>E-mail: m.gomes123@hghgh.com</p>
      </div>

      <div class="q-mt-md">
        <q-btn label="Reservar" color="primary" @click="toInstructions" />
        <q-btn label="Desistir" color="negative" @click="showOptions" />
      </div>
      <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">E agora?</div>
          </q-card-section>
          <q-card-section>
            <q-btn label="Ir para a página inicial" color="primary" @click="navigateToHome" />
            <q-btn label="Esolher um horário" color="secondary" @click="navigateToAppointment" />
            <q-btn label="Encerrar" color="negative" @click="closePage" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

  </q-page>
</q-page-container>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from 'stores/auth.js'

  
  const auth = useAuthStore()
  
  const route = useRoute();
  const router = useRouter();

// Is the user authenticated?
//  const isUserAuthenticated = ref(false);
  

  // mock data
  const professionalName = 'Dr. João da Silva';
  const areaOfExpertise = 'Clínica Médica';
  const officeAddress = 'Rua da Glória, 171';
  
  // appointment date and time from routing parameter
  const appointmentDateTime = route.params.appointmentDateTime;
  
  // for the cancel dialog
  const showDialog = ref(false);
  
  // Navigate to instructions page
  const toInstructions = () => {
    router.push({ name: 'Instructions' });
  };
  
  // Show cancel options
  const showOptions = () => {
    showDialog.value = true;
  };
  
  // Navigate to Home Page
  const navigateToHome = () => {
    router.push({ name: 'Profile' });
  };
  
  // Navigate to Appointment Page
  const navigateToAppointment = () => {
    router.push({ name: 'SlotSelection' });
  };
  
  // Close the current page
  const closePage = () => {
    window.close();
  };
  </script>
  