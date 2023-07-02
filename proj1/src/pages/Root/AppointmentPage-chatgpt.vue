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
        v-model="myShiftSelection"
        :options="myOptions"
        color="primary"
      />
    </q-card-section>
  </q-card>
  
  <template v-for="(availDateAndTimes, index) in availableSlots" :key="index">
    <div class="q-pa-lg">
      <q-card>
        <q-card-section>
        
          <!-- The date -->
          <q-card-section>
            <div class="text-h5">{{ availDateAndTimes.theDate }}</div>
          </q-card-section>
        
          <q-separator color="black" inset />
        
          <!-- The first expandable section -->
          <q-card-actions>
              <q-btn
                color="red"
                round
                flat
                dense
                :icon="availDateAndTimes.isExpanded1st ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="availDateAndTimes.isExpanded1st = !availDateAndTimes.isExpanded1st"
              />
          </q-card-actions>
        
          <q-slide-transition>
              <div v-show="availDateAndTimes.isExpanded1st"> <!-- Shows the card section conditionally -->
                <q-card-section>
                  <div class="text-h6"> {{ labelMorning }}</div>
                  <!-- Shows the times -->
                  <q-chip clickable color="green" v-for="time in firstGroup" :key="time" @click="handleChipClick(time)">{{ time }}</q-chip>
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
                :icon="availDateAndTimes.isExpanded2nd ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="availDateAndTimes.isExpanded2nd = !availDateAndTimes.isExpanded2nd"
              />
          </q-card-actions>
      
            <q-slide-transition>
              <div v-show="availDateAndTimes.isExpanded2nd"> <!-- Shows the card section conditionally -->
                <q-card-section>
                  <div class="text-h6"> {{ labelAfternoon }}</div>
                  <!-- Shows the times -->
                  <q-chip clickable color="green" v-for="time in secondGroup" :key="time" @click="handleChipClick(time)">{{ time }}</q-chip>
                </q-card-section>
              </div>
            </q-slide-transition>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <q-card class="q-pa-md row justify-around">
    <q-btn class="col-auto" label="<< Mês anterior" color="green" @click="handlePreviousMonth"/>
    <q-btn class="col-auto" label="Próximo mês >>" color="green" @click="handleNextMonth"/>
  </q-card>
  
  </q-page>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface DateAndTimes {
    theDate: string,
    theTimes: string[],
    isExpanded1st: boolean,
    isExpanded2nd: boolean
  }
  
  const sampleSize = 5;
  
  let labelMorning = ref('Manhã')
  let labelAfternoon = ref('Tarde')
  let lastOfTheMorning = ref('12:30')
  let myShiftSelection = ref('all') 
  let desiredShifts = ref('Escolha quais turnos deseja ver')
  let myOptions = ref([{ label: 'Manhã', value: 'morning' }, { label: 'Tarde', value: 'afternoon' }, { label: 'Ambos', value: 'all' }])
  
  const availableSlots: DateAndTimes[] = Array(sampleSize).fill(0).map((_, i) => ({
    theDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toDateString(),
    theTimes: ['08:00', '09:40', '10:00', '11:00', '12:00','12:20', '12:40', '13:20', '14:00', '15:40', '16:00', '17:00', '18:00'],
    isExpanded1st: true,
    isExpanded2nd: true
  }))
  
  const firstGroup = computed(() => availableSlots[0].theTimes.filter(time => time <= lastOfTheMorning.value))
  const secondGroup = computed(() => availableSlots[0].theTimes.filter(time => time > lastOfTheMorning.value))
  
  const handleChipClick = (time: string) => {
    const selectedTimeSlot = `Date: ${availableSlots[0].theDate} Time: ${time}`
    console.log(selectedTimeSlot)
  }
  
  const handlePreviousMonth = () => {
    console.log('Previous month clicked')
  }
  
  const handleNextMonth = () => {
    console.log('Next month clicked')
  }
</script>
  
  <style scoped>
  .q-card {
    margin-top: 15px;
  }
  </style>
  