<template>
<!--
Shows Time Slots received by means of an array of objects. 
The user can control displaying each group (shift) in a particular date.
-->
<div class="q-pa-lg">
  <q-card>
  <q-card-section>

    <!-- The date -->
    <q-card-section>
      <div class="text-h5">{{ propDateAndTimes.theDate }}</div>
    </q-card-section>

    <q-separator color="black" inset />

    <!-- The first expandable section -->
    <q-card-actions>
        <q-btn
          color="red"
          round
          flat
          dense
          :icon="isExpanded1st ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="isExpanded1st = !isExpanded1st"
        />
    </q-card-actions>

    <q-slide-transition>
        <div v-show="isExpanded1st"> <!-- Shows the card section conditionally -->
          <q-card-section>
            <div class="text-h6"> {{ propFirstLabel }}</div>
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
          :icon="isExpanded2nd ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="isExpanded2nd = !isExpanded2nd"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="isExpanded2nd"> <!-- Shows the card section conditionally -->
          <q-card-section>
            <div class="text-h6"> {{ propSecondLabel }}</div>
            <!-- Shows the times -->
            <q-chip clickable color="green" v-for="time in secondGroup" :key="time" @click="handleChipClick(time)">{{ time }}</q-chip>
          </q-card-section>
        </div>
      </q-slide-transition>

</q-card-section>
</q-card>
</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

// The array of Time Slots
interface DateAndTimes {
  theDate: Date,
  theTimes: string[]
}

// Props
const props = defineProps({
  propDateAndTimes: { 
    type: Object as () => DateAndTimes, 
    required: true
  },
  propFirstLabel: {
    type: String,
    default: ''
  },
  propSecondLabel: {
    type: String,
    default: ''
  },
  propShiftSelection: {
    type: String,
    default: ''
  },
  propLastOf1stGroup: {
    type: String,
    default: ''
  },
})

let myShiftSelection = ref(props.propShiftSelection)

let optionShow1st = computed(() => myShiftSelection.value != 'afternoon' ? 'sim' : 'nao')
let optionShow2nd = computed(() => myShiftSelection.value != 'morning' ? 'sim' : 'nao')

let isExpanded1st = ref(optionShow1st.value === 'sim') 
let isExpanded2nd = ref(optionShow2nd.value === 'sim') 

watch(() => props.propShiftSelection, (newVal) => {
  myShiftSelection.value = newVal
})

watch(optionShow1st, (newVal) => {
  isExpanded1st.value = newVal === 'sim'
})

watch(optionShow2nd, (newVal) => {
  isExpanded2nd.value = newVal === 'sim'
})

const firstGroup = computed(() => props.propDateAndTimes.theTimes.filter(time => time <= props.propLastOf1stGroup))
const secondGroup = computed(() => props.propDateAndTimes.theTimes.filter(time => time > props.propLastOf1stGroup))

const handleChipClick = (time: string) => {
  const selectedTimeSlot = `${props.propDateAndTimes.theDate} Time: ${time}`
  console.log(selectedTimeSlot)
}
</script>
