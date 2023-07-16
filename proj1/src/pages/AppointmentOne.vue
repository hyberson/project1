<template>
  <q-page-container>
    <q-page class="flex q-pa-md">
    <div class="q-pa-md">
      <h3>Appointment One - Reserva de Horário</h3>
      <div>
        <p>Médico: {{ professionalName }}</p>
        <p>Especialidade: {{ areaOfExpertise }}</p>

        <p>Modalidade: <strong>PARTICULAR</strong></p>
        <p>Preço da consulta: R$ 500,00 (quinhentos reais)</p>

        <!-- <p>Data e Horário: {{ appointmentDateTime }}</p> -->
        <p>Data e Horário: {{ receivedAppointmentDateTime }}</p>
        
        <p>Endereço: {{ officeAddress }}</p>
      </div>

      <div class="q-mt-md">
        <q-btn label="Continuar" color="primary" @click="toProsseguir" />
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
  
  const route = useRoute();
  const router = useRouter();
  
  // mock data
  const professionalName = 'Dr. João da Silva';
  const areaOfExpertise = 'Clínica Médica';
  const officeAddress = 'Rua da Glória, 171';
  
  // appointment date and time from routing parameter
  const receivedAppointmentDateTime = route.params.appointmentDateTime;
  
  // for the cancel dialog
  const showDialog = ref(false);


  // Navigates to the second appointment page
  const toProsseguir = () => {
router.push(
  { 
     name: 'AppointmentTwo', 
     params: { 
       // appointmentDateTime: encodeURIComponent('quinta-2-de-maio-de-2021-12h00') // encoded pela segunda vez?!?
       // appointmentDateTime: encodeURIComponent('paramAppointmentDateTime')
       appointmentDateTime: receivedAppointmentDateTime  //  mudei 
     } 
  }
);

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
  