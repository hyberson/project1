<template>
<!-- This is an appointment confirmation page. 
It shows
- the name of the professional
- thea area of expertise of the professional
- the date and time of the appointment - received as a routing parameter.
- the address of the professional's office.
-->
    <div class="q-pa-md">
      <h2>Agendamento</h2>
      <div>
        <p>Profissional: {{ professionalName }}</p>
        <p>Especialidade: {{ areaOfExpertise }}</p>
        <p>Data e Horário: {{ appointmentDateTime }}</p>
        <p>Endereço: {{ officeAddress }}</p>
      </div>
      <div class="q-mt-md">
        <q-btn label="Agendar" color="primary" @click="navigateToInstructions" />
        <q-btn label="Não agendar" color="negative" @click="showOptions" />
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
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();

// Is the user authenticated?
//  const isUserAuthenticated = ref(false);
  
  // mock data
  const professionalName = 'João da Silva';
  const areaOfExpertise = 'Consultor - Tabajara Consultoria em Negócios';
  const officeAddress = 'Rua da Glória, 171';
  
  // appointment date and time from routing parameter
  const appointmentDateTime = route.params.appointmentDateTime;
  
  // for the cancel dialog
  const showDialog = ref(false);
  
  // Navigate to instructions page
  const navigateToInstructions = () => {
    router.push({ name: 'SignIn' });
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
  