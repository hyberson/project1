<!-- ChipClick.vue
It works
-->
<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="card">
        <q-card-section>
          <!-- Option Group to Select 'Morning', 'Afternoon', or 'Both' -->
          <q-option-group
            v-model="selectedTime"
            :options="timeOptions"
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>

    <!-- Iterate over Each Item in dateTimeArray to Create Date-Time Cards -->
    <div class="q-pa-lg">
      <q-card v-for="(item, index) in dateTimeArray" :key="index" class="card">
        <q-card-section>
          <div class="date">Horários disponíveis no dia {{ item.date }}</div>
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
                <div class="expandable-header">Durante a manhã</div>
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
                <div class="expandable-header">Durante a tarde (iniciando após as {{ divisionTime }})</div>
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

// Reactive References
const dateTimeArray = ref([]);
const divisionTime = ref('12:00');
const selectedTime = ref('both');
const cardStates = ref({});

// Available Time Options
const timeOptions = [
  {
//    label: 'Durante a manhã' + ' aaa',
label: 'Durante a manhã (iniciando até as ' + divisionTime.value + ')',
    value: 'morning'
  },
  {
    label: 'Durante a tarde',
    value: 'afternoon'
  },
  {
    label: 'Todos os horários',
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

// Handler for Click Events on Time Chips
function chipClickHandler(date, time) {
  console.log('Chip clicked - Date:', date, 'Time:', time);
}
</script>

<style scoped>
.card {
  margin-bottom: 40px;
  background-color: #f5f5f5; ;
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
