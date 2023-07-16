<!-- InstructionsPage.vue 
- tamanho da fonte

--> 
<template> 
    <div class="q-pa-md">
      <h3>Próximos passos</h3>
      <div>
        <font size="5"
          face="verdana"
          color="black">
<p>A sua consulta está marcada para ... .  <br><br>
  
Os horários do profissional são muito disputados.<br><br>

Se for necessário desmarcar a consulta, por gentileza envie uma mensagem ou ligue para o número ...,
 assim que souber que não poderá comparecer. <br><br>

Dessa maneira, teremos tempo para encaixar alguém que esteja na lista de espera.
</p>
</font>
<br>

</div>
      <div class="q-mt-md">
        <q-btn label="Enviar via e-mail" color="primary" @click="toSendEmail" />
        <q-btn label="Enviar uma mensagem" color="negative" @click="toSendMessage" />
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
 // import { useRoute, useRouter } from 'vue-router';
  
  // const route = useRoute();
  // const router = useRouter();
  
  // mock data
  
  // appointment date and time from routing parameter
  // const appointmentDateTime = route.params.appointmentDateTime;
  
  // for the cancel dialog
  const showDialog = ref(false);
  
  // Navigate to instructions page
  const toSendEmail = () => {
    router.push({ name: 'SendingEmail' });
  };
  
  // Show cancel options
  const toSendMessage = () => {
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
  