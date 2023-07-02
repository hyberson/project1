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
  <div class="text-h6">{{desiredShifts}}</div>
  <q-card-section class="q-pa-lg">
    <q-option-group
      v-model="shiftSelection"
      :options="myOptions"
      color="primary"
    />
  </q-card-section>
</q-card>

<!-- Props
- an array of objects, each object containing a date and an array of times
- a label for the first group of times
- a label for the second group of times
- !!!!!!!!!!! -->
<TimeSlotSelection
v-for="(availDateAndTimes, index) in availableSlots" 
    :key="index"  
    :propDateAndTimes="availDateAndTimes" 
    :propFirstLabel="labelMorning" 
    :propSecondLabel="labelAfternoon"
    :propShiftSelection="shiftSelection"
    :propLastOf1stGroup="lastOfTheMorning"
/>

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
import { ref, computed } from 'vue'
import TimeSlotSelection from 'components/TimeSlotSelection.vue'

/*
The user will select if they want to see time slots in the morning and/or in the afternoon.
*/

const desiredShifts = 'Você deseja agendar ...'

const myOptions = [
    { label: 'Pela manhã', value: 'morning' },
    { label: 'À tarde', value: 'afternoon' },
    { label: 'Tanto faz', value: 'all' }
  ]

/*
The user will select if they want to see time slots in the morning and/or in the afternoon.
*/
const shiftSelection = ref('all') // This is the QOption model

/* Labels for the groups of times */
const labelMorning = ref('Manhã')
const labelAfternoon = ref('Tarde')

/* Last time of the morning */
const lastOfTheMorning = '12:30'

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

/*
An array of objects, each object containing a date and an array of times.
*/
// Creates an array of objects to simulate the data received from the server.
const availableSlots = computed(() => {
  let qttyOfDates = 20 // Quantity of dates to be generated
  let availDateAndTimes = []
  for (let i = 0; i < qttyOfDates; i++) {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() + i)
    availDateAndTimes.push({
      theDate: aDate, 
      theTimes: ['08:00', '09:40', '10:00', '11:00', '12:00','12:20', '12:40', '13:20', '14:00', '15:40', '16:00', '17:00', '18:00'] 
    })
  }
  return availDateAndTimes
})
</script>
