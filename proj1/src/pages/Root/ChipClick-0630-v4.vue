<!-- ChipClick.vue
  
Modify the function chipClickHandler. Create a confirmation dialog. Use Quasar elements. 
Tell me if I have to install something.

  }).onOk(() => {
    console.log('Confirmed! Chip clicked - Date:', date, 'Time:', time);

There is an error: the date displayed here is not the same date that was clicked! In fact, it is always the following day. Wh

-->
<template>
  <q-page>

<div class="q-pa-lg">
  <q-card class="card">
    <q-card-section class="fixed-card-1" style="font-size: 16px;">
      <div class="q-mb-md" style="font-size: 22px; font-weight: bold;">Mostrar quais horários?</div>
      <!-- Option Group to Select 'Morning', 'Afternoon', or 'Both' -->
      <q-option-group
        v-model="selectedTime"
        :options="timeOptions"
        color="primary"
        style="font-size: 18px;"
      />
    </q-card-section> 
  </q-card>
</div>

<!--
  <div class="q-pa-lg">
  <q-card class="card">
    <q-card-section class="fixed-card-2" style="font-size: 16px;">
      <div class="q-mb-md" style="font-size: 20px; font-weight: bold;">Horários disponíveis</div>
 <img class="arrow-down" src="arrow.png" alt="Seta para baixo" />       
    </q-card-section>
  </q-card>
</div>
-->

    <!-- Iterate over Each Item in dateTimeArray to Create Date-Time Cards -->
    <div class="q-pa-lg">
      <q-card v-for="(item, index) in dateTimeArray" :key="index" class="card">
        <q-card-section>
<!--          <div class="date">Em {{ item.date }}</div>  
         <div class="date">Em {{ new Date(item.date).toLocaleDateString() }}</div>  
  <div class="date">Em {{ new Intl.DateTimeFormat('pt-BR').format(new Date(item.date)) }}</div> -->
  <div class="date">{{ new Date(item.date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
</q-card-section>

        <q-separator color="gray" inset />
        
        <!-- Times before Division Time -->
        <q-card-section>
          <div class="times">
            <q-expansion-item
              v-model="cardStates[item.date].isMorningExpanded"
              @update:modelValue="cardStates[item.date].isMorningExpanded = $event"
            >
              <template v-slot:header>
<!--                <div class="expandable-header">Pela manhã</div> -->
                <div class="expandable-header">
          {{ cardStates[item.date].isMorningExpanded ? textMorningExpanded : textMorningNotExpanded }}
        </div>
              </template>

              <div class="expandable-content">
                <div class="chip"
                     v-for="(time, chipIndex) in item.timesBefore"
                     :key="chipIndex"
                     @click="chipClickHandler(item.date, time)">
                  {{ time }}
                </div>
              </div>
            </q-expansion-item>
          </div>
        </q-card-section>

        <q-separator color="black" inset />

        <!-- Times after Division Time -->
        <q-card-section>
          <div class="times">
            <q-expansion-item
              v-model="cardStates[item.date].isAfternoonExpanded"
              @update:modelValue="cardStates[item.date].isAfternoonExpanded = $event"
            >
              <template v-slot:header>
                <div class="expandable-header">
          {{ cardStates[item.date].isAfternoonExpanded ? textAfternoonExpanded : textAfternoonNotExpanded }}
        </div>
              </template>

              <div class="expandable-content">
                <div class="chip"
                     v-for="(time, chipIndex) in item.timesAfter"
                     :key="chipIndex"
                     @click="chipClickHandler(item.date, time)">
                  {{ time }}
                </div>
              </div>
            </q-expansion-item>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// import { Dialog } from 'quasar';
// import { useQuasar } from 'quasar';
// import { ref, watch, onMounted, watchEffect } from 'vue';
import { Dialog } from 'quasar';

// ...

// During setup
//const $q = useQuasar();

// Reactive References
const dateTimeArray = ref([]);
const divisionTime = ref('12:00');
const selectedTime = ref('both');
const cardStates = ref({});
//
const textMorningExpanded = ref('Pela manhã');
const textMorningNotExpanded = ref('Voltar a mostrar');
const textAfternoonExpanded = ref('À tarde');
const textAfternoonNotExpanded = ref('Mostrar os horários da tarde');

// Available Time Options
const timeOptions = [
  {
//    label: 'Durante a manhã' + ' aaa',
label: 'Da manhã (iniciando até as ' + divisionTime.value + ')',
    value: 'morning'
  },
  {
    //label: 'Tarde',
    label: 'Da tarde (iniciando depois das ' + divisionTime.value + ')',
    value: 'afternoon'
  },
  {
    label: 'Todos os horários (manhã e tarde)',
    value: 'both'
  }
];

onMounted(() => {
// Populate dateTimeArray After the Component is Mounted
  dateTimeArray.value = generateDateTimeArray();
// Initialize Card States
  initializeCardStates();
// Set up a watcher: changes on selected times (shifts)
  watchSelectedTime();
});

// Generate Date-Time Array
function generateDateTimeArray() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

  const dateTimeArray = [];
  const numberOfDays = 5; // Number of days to generate

  for (let i = 1; i <= numberOfDays; i++) {
    const nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dateString = nextDate.toISOString().split('T')[0];

    const divisionHour = Number(divisionTime.value.split(':')[0]);
    const divisionMinute = Number(divisionTime.value.split(':')[1]);
    const timesBefore = [];
    const timesAfter = [];

    for (let hour = 8; hour <= 18; hour++) {
      const timeString = hour.toString().padStart(2, '0') + ':00';

      const currentHour = Number(timeString.split(':')[0]);
      const currentMinute = Number(timeString.split(':')[1]);

      if (currentHour < divisionHour || (currentHour === divisionHour && currentMinute <= divisionMinute)) {
        timesBefore.push(timeString);
      } else {
        timesAfter.push(timeString);
      }
    }

    dateTimeArray.push({ date: dateString, timesBefore, timesAfter });
  }

  return dateTimeArray;
}

// Initialize Card States
function initializeCardStates() {
  dateTimeArray.value.forEach(item => {
    cardStates.value[item.date] = {
      isMorningExpanded: selectedTime.value === 'both' || selectedTime.value === 'morning',
      isAfternoonExpanded: selectedTime.value === 'both' || selectedTime.value === 'afternoon',
    };
  });
}

// Watch Selected Time for Changes and Update Card States Accordingly
function watchSelectedTime() {
  watch(selectedTime, (newVal) => {
    for (const date in cardStates.value) {
      cardStates.value[date].isMorningExpanded = newVal === 'both' || newVal === 'morning';
      cardStates.value[date].isAfternoonExpanded = newVal === 'both' || newVal === 'afternoon';
    }
  });
}

/* Handler for Click Events on Time Chips
function chipClickHandler(date, time) {
  console.log('Chip clicked - Date:', date, 'Time:', time);
} */

// Handler for Click Events on Time Chips
function chipClickHandler(date, time) {
  Dialog.create({
  title: 'Confirmar a sua escolha',
  /* message: `
    <span style="font-size: 20px;">
      Você escolheu 
      ${new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} 
      às ${time}. Confirma?
    </span>
  `,
  html: true,  // Note this line, it's necessary to render HTML in the message */
  message: `
  <div style="font-size: 20px;">
    <div>Você escolheu:</div>
    <div>${new Date(date).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
    <div>às ${time}.</div>
    <div>Confirma?</div>
  </div>
`,
  html: true,
  ok: {
    label: 'Confirmar',
    color: 'primary',
  },
    cancel: true,
    persistent: true
  }).onOk(() => {
    console.log('Confirmed! Chip clicked - Date:', date, 'Time:', time);
  }).onCancel(() => {
    console.log('Selection cancelled');
  }).onDismiss(() => {
    console.log('Dialog dismissed');
  });
}

</script>

<style scoped>
.card {
  margin-bottom: 60px;
  background-color: #f5f5f5; 
  top: 160px;
}

.fixed-card-1 {
    position: fixed;
    top: 60px;
    z-index: 1000;
  margin-bottom: 40px;
  background-color: #f1f2eb;
  left: 190;
    width: 90vw; /* Adjust the width percentage as desired */
 ;
}
.fixed-card-2 {
    position: fixed;
    top: 320px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  background-color: #f1f2eb;
  }

  .arrow-down {
    margin-top: 10px;
  }

.date {
  font-weight: bold;
  font-size: 24px;
}
.times {
  display: flex;
  flex-wrap: wrap;
}

.expandable-header {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  color: red;
}

.expandable-content {
  margin-top: 10px;
}

.chip {
  display: inline-block;
  padding: 15px;
  font-weight: bold;
  font-size: 22px;
  background-color: #1fe21f;
  cursor: pointer;
  border-radius: 25px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
