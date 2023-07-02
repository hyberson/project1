<!--
Shows available time slots –dates and times–, for the user to make an appointment.
-->
<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <q-btn class="col-auto" label="< Na semana anterior" />

      <div class="col-6">
        <q-card class="q-ma-md">

          <q-card-section>
            <div class="text-h6">Você tem disponibilidade pela manhã?</div>
            <q-option-group
             v-model="morningSelection"
             :options="myOptions"
             color="primary"
             inline
            >
            </q-option-group>

          </q-card-section>
          <q-space></q-space>
          <q-card-section>
            <div class="text-h6">Você tem disponibilidade à tarde?</div>
            <q-option-group
             v-model="afternoonSelection"
             :options="myOptions"
             color="primary"
             inline
            >
            </q-option-group>
          </q-card-section>
          <q-space></q-space>

        </q-card>
      </div>

      <q-btn class="col-auto" label="Na semana seguinte >" />

    </div>

    <!--  <div class="text-h6">{{morningSelection}}</div>
    <div class="text-h6">{{afternoonSelection}}</div> */  -->

    <DisplayTimes
      v-for="(availDateAndTimes, index) in availableSlots" 
      :key="index" 
      :propDateAndTimes="availDateAndTimes" 
      :propFirstLabel="labelMorning" 
      :propSecondLabel="labelAfternoon"
      :propOptionShow1st="morningSelection"
      :propOptionShow2nd="afternoonSelection"
    />

    <q-btn class="col-auto" label="<< No mês anterior" />
    <q-btn class="col-auto" label="No mês seguinte >>" />

  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import SelectOptions from 'components/SelectOptions.vue'
import DisplayTimes from 'components/DisplayTimes.vue'

const myOptions = [
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'nao' }
  ]
  
const morningSelection = ref('sim')
const afternoonSelection = ref('sim')

const labelMorning = ref('Horários disponíveis pela manhã')
const labelAfternoon = ref('Horários disponíveis à tarde')

// Creating an array of objects to simulate the data received from the server
const availableSlots = computed(() => {
  let availDateAndTimes = []
  for (let i = 0; i < 5; i++) {
    let aDate = new Date()
    aDate.setDate(aDate.getDate() + i)
    availDateAndTimes.push({
      theDate: aDate, 
      theTimes: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] 
    })
  }
  return availDateAndTimes
})
</script>
