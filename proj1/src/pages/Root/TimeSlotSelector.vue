<template>
  <q-page padding>
  <div>
    <q-select
      v-model="selectedPeriod"
      :options="periodOptions"
      label="Choose Period"
      emit-value
      map-options
    />

    <q-card v-for="(slots, date) in groupedSlots" :key="date" class="q-ma-md">
      <q-card-section>
        <div class="text-h6">{{ formatDate(date.toString()) }}</div>
      </q-card-section>

      <q-separator />

      <div v-if="selectedPeriod !== 'afternoon'">
        <q-card-section>
          <div class="text-subtitle2">Morning</div>
          <q-btn-toggle
            v-model="expandedSections[date as string].morning"
            push
            size="sm"
            :options="[
              { label: 'Expand', value: true, icon: 'expand_more' },
              { label: 'Shrink', value: false, icon: 'expand_less' },
            ]"
          />
          <div v-show="expandedSections[date].morning">
            <q-chip
  v-for="slot in slots.morning"
  :key="slot.getTime()"
  clickable
  @click="selectSlot(slot)"
>
              {{ formatTime(slot) }}
            </q-chip>
          </div>
        </q-card-section>

        <q-separator />
      </div>

      <div v-if="selectedPeriod !== 'morning'">
        <q-card-section>
          <div class="text-subtitle2">Afternoon</div>
          <q-btn-toggle
            v-model="expandedSections[date].afternoon"
            push
            size="sm"
            :options="[
              { label: 'Expand', value: true, icon: 'expand_more' },
              { label: 'Shrink', value: false, icon: 'expand_less' },
            ]"
          />
          <div v-show="expandedSections[date].afternoon">
<q-chip
  v-for="slot in slots.afternoon"
  :key="slot.getTime()"
  clickable
  @click="selectSlot(slot)"
>

              {{ formatTime(slot) }}
            </q-chip>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import { useQuasar, date as quasarDate } from 'quasar'
// import ptBr from 'quasar/lang/pt-br'

// Utility function to convert English weekday names to Portuguese
const englishToPortugueseWeekday = (weekday: string): string => {
  switch (weekday) {
    case 'Monday': return 'Segunda-feira'
    case 'Tuesday': return 'Terça-feira'
    case 'Wednesday': return 'Quarta-feira'
    case 'Thursday': return 'Quinta-feira'
    case 'Friday': return 'Sexta-feira'
    case 'Saturday': return 'Sábado'
    case 'Sunday': return 'Domingo'
    default: return weekday
  }
}
// Utility function to convert English month names to Portuguese
const englishToPortugueseMonth = (month: string): string => {
  switch (month) {
    case 'January': return 'janeiro'
    case 'February': return 'fevereiro'
    case 'March': return 'março'
    case 'April': return 'abril'
    case 'May': return 'maio'
    case 'June': return 'junho'
    case 'July': return 'julho'
    case 'August': return 'agosto'
    case 'September': return 'setembro'
    case 'October': return 'outubro'
    case 'November': return 'novembro'
    case 'December': return 'dezembro'
    default: return month
  }
}

interface Slot {
  morning: Date[],
  afternoon: Date[],
}

const NOON = 12
const qttyOfElements = 10

// Generate mock time slots
const generateTimeSlots = (): Date[] => {
  let slots: Date[] = []
  let now = new Date()

  for (let i = 0; i < qttyOfElements; i++) {
    now.setHours(Math.floor(Math.random() * 24))
    now.setMinutes(Math.floor(Math.random() * 60))
    slots.push(new Date(now))
    now = new Date(now.getTime() + 1000 * 60 * 60 * 24)
  }

  return slots
}

const timeSlots = ref<Date[]>(generateTimeSlots())
const selectedPeriod = ref<string>('both')

const periodOptions: string[] = ['morning', 'afternoon', 'both']

const q = useQuasar()

const groupedSlots = computed<Record<string, Slot>>(() => {
  let group: Record<string, Slot> = {}

  timeSlots.value.forEach(slot => {
    const date = quasarDate.formatDate(slot, 'yyyy-MM-dd')

    if (!group[date]) {
      group[date] = {
        morning: [],
        afternoon: [],
      }
    }

    if (slot.getHours() < NOON) {
      group[date].morning.push(slot)
    } else {
      group[date].afternoon.push(slot)
    }
  })

  return group
})

const formatDate = (date: string): string => {
  // first format the date using Quasar's formatDate function
  let formattedDate = quasarDate.formatDate(new Date(date), 'dddd, DD de MMMM de YYYY')

  // split the formatted date into components
  let [weekday, day, month, year] = formattedDate.split(' ')

  // replace the English weekday and month names with Portuguese
  weekday = englishToPortugueseWeekday(weekday)
  month = englishToPortugueseMonth(month)

  // return the formatted date
  return `${weekday}, ${day} de ${month} de ${year}`
}

const formatTime = (time: Date): string => {
  return quasarDate.formatDate(time, 'HH:mm')
}

const selectSlot = (slot: Date): void => {
  q.dialog({
    title: 'Confirm',
    message: `Do you want to select the slot at ${formatTime(slot)}?`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    // handle confirmation here
    console.log(`Selected slot: ${slot}`)
  })
}

// Create a reactive state for the expanded sections
const expandedSections = ref<Record<string, {morning: boolean, afternoon: boolean}>>({})

// Update the expanded sections state when the grouped slots change
watchEffect(() => {
  for (let date in groupedSlots.value) {
    if (!expandedSections.value[date]) {
      expandedSections.value[date] = { morning: true, afternoon: true }
    }
  }
})

</script>
