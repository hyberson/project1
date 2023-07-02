<!--
  ESTA VERSÃO FUNCIONA COM O COMPONENTE TimeSlotSelection-0624-v3.vue
  
  Displays available Time Slots –dates and times– for the user to make a selection.
  The user will select if they want to see Time Slots in the morning and/or in the afternoon.
  Allows the user to move backwards/forward one week/month.
-->
<template>
<q-page padding>

<q-card>
  <!-- Service provider name and expertise -->
  <div class="text-h5">João da Silva</div>
  <div class="text-h6">Fisioterapeuta</div>
</q-card>

<q-separator color="black" inset />

<q-card>
  <!-- The user will select if they want to see time slots in the morning and/or in the afternoon. -->
  <div class="text-h6">{{questionShifts}}</div>
  <q-card-section class="q-pa-lg">
    <q-option-group
      v-model="selectedShifts"
      :options="myOptions"
      color="primary"
    />
  </q-card-section>
</q-card>

<!-- <template v-for="(availDateAndTimes, index) in availableSlots" :key="index">  -->
<template v-for="(slotsOnDate, index) in nowAvailable" :key="index">
    <div class="q-pa-lg">
      <q-card>

  <q-card-section>
    <!-- The date -->
    <q-card-section>
<!--      <div class="text-h5">{{ slotsOnDate.theDate }}</div> -->
      <div class="text-h5">Uma data qualquer</div>
    </q-card-section>

    <q-separator color="black" inset />

    <!-- The first expandable section -->
    <q-card-actions>
        <q-btn
          color="red"
          round
          flat
          dense
          :icon="willShowMorning ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="willShowMorning = !willShowMorning"
        />
    </q-card-actions>

    <q-slide-transition>
        <div v-show="willShowMorning"> <!-- Shows the card section conditionally -->
          <q-card-section>
            <div class="text-h6"> {{ labelMorning }}</div>
            <!-- Shows the times -->
            <q-chip clickable color="green" v-for="theTime in firstGroup" :key="theTime" @click="handleChipClick(theTime)">{{ theTime }}</q-chip>
          </q-card-section>
        </div>
    </q-slide-transition>
  </q-card-section>

  <q-separator color="gray" inset />

  <q-card-section> 
    <!-- The second expandable section -->
    <q-card-actions>
        <q-btn
          color="red"
          round
          flat
          dense
          :icon="willShowAfternoon ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="willShowAfternoon = !willShowAfternoon"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="willShowAfternoon"> <!-- Shows the card section conditionally -->
          <q-card-section>
            <div class="text-h6"> {{ labelAfternoon }}</div>
            <!-- Shows the times -->
            <q-chip clickable color="green" v-for="theTime in secondGroup" :key="theTime" @click="handleChipClick(theTime)">{{ theTime }}</q-chip>
          </q-card-section>
        </div>
      </q-slide-transition>

</q-card-section>
</q-card>
</div>
</template>
      
<div v-show="isShowingPeriodButtons"> <!-- Shows the buttons card conditionally -->
  <q-card>
    <q-card-section>
    <!-- The user can move backwards/forward one month. TORNAR OS LABELS CONSTANTES -->
    <q-btn class="col-auto" label="<< Mês anterior" color="green" @click="handlePreviousMonth" /> 
    <q-btn class="col-auto" label="Mês seguinte >>" color="green" @click="handleFollowingMonth" />
    </q-card-section>

  <q-card-section>
  <!-- The user can move backwards/forward one week. -------- TORNAR OS LABELS  -->
    <q-btn class="col-auto" label="< Semana anterior" color="blue" @click="handlePreviousWeek"  />
    <q-btn class="col-auto" label="Semana seguinte >" color="blue" @click="handleFollowingWeek"/>
  </q-card-section>
</q-card>
</div>

</q-page>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// import TimeSlotSelection from 'components/TimeSlotSelection.vue'

/*
The user will select if they want to see time slots in the morning and/or in the afternoon.
*/

const questionShifts = 'Você deseja agendar ...'

const myOptions = [
    { label: 'Pela manhã', value: 'morning' },
    { label: 'À tarde', value: 'afternoon' },
    { label: 'Tanto faz', value: 'all' }
  ]

/*
The user will select if they want to see time slots in the morning and/or in the afternoon.
*/
const selectedShifts = ref('all') // This is the QOption model

/* Labels for the shifts */
const labelMorning = ref('Manhã')
const labelAfternoon = ref('Tarde')

/* Last time of the morning */
const lastOfTheMorning = '12:30'

/*
An array of objects, each object containing a date and an array of times.
*/
// Creates an array of objects ...

let qttyOfDates = 20; // Quantity of dates to be generated

interface timeSlots {
  slotsOnDate: {
    theDate: Date;
    theTimes: string[];
  };
}
const nowAvailable: timeSlots[] = [];

for (let i = 0; i < qttyOfDates; i++) {
  let aDate = new Date();
  aDate.setDate(aDate.getDate() + i);
  nowAvailable.push({
    slotsOnDate: {
      theDate: aDate, 
      theTimes: ['08:00', '09:40', '10:00', '11:00', '12:00', '12:20', '12:40', '13:20', '14:00', '15:40', '16:00', '17:00', '18:00']
    }
  });
}

console.log(nowAvailable);

// ================ COMPONENTE ===== INICIO ==============

let myShifts = ref(selectedShifts.value)

let optShowMorning = computed(() => myShifts.value != 'afternoon' ? 'yes' : 'no')
let optShowAfternoon = computed(() => myShifts.value != 'morning' ? 'yes' : 'no')

let willShowMorning = ref(optShowMorning.value === 'yes') 
let willShowAfternoon = ref(optShowAfternoon.value === 'yes') 

watch(() => selectedShifts, (newVal) => {
  myShifts.value = newVal.value
})

watch(optShowMorning, (newVal) => {
  willShowMorning.value = newVal === 'yes'
})

watch(optShowAfternoon, (newVal) => {
  willShowAfternoon.value = newVal === 'yes'
})

const firstGroup = nowAvailable.theTimes.filter(theTime => theTime <= lastOfTheMorning)
const secondGroup = theTimes.filter(theTime => theTime > lastOfTheMorning)

const handleChipClick = (theTime: string) => {
  const selectedTimeSlot = `${slotsOnDate.theDate} Time: ${theTime}`
  console.log(selectedTimeSlot)
  
}

// ================ COMPONENTE ======= FIM ============

/*
  Allows the user to move backwards/forward one week/month.

  TORNAR OS BOTÕES FLUTUANTES

  QUANDO (NÃO) MOSTRAR OS BOTÕES?
  NAO MOSTRAR
  - NO INICIO
  MOSTRAR
  - QUANDO ATINGIR n% DO SCROLL

  A MODIFICAÇÃO DA SELEÇÃO DO TURNO NÃO DEVE MOODIFICAR O PERIODO VIGENTE

  */

const isShowingPeriodButtons = ref(true)

// Month
const handlePreviousMonth = () => {
  console.log('Previous month')
}
const handleFollowingMonth = () => {
  console.log('Following month')
}

// Week
const handlePreviousWeek = () => {
  console.log('Previous week')
}
const handleFollowingWeek = () => {
  console.log('Following week')
}

</script>
