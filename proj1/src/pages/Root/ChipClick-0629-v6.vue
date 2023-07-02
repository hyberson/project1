<!-- This code generates a set of cards with dates and corresponding times. The times are divided into two sections: 
  "Times before" and "Times after" a specified division time. The generated data is reactive, and 
  the chipClickHandler function handles click events on the time chips. 

0629-v6
In this modified code:

The selectedTime reactive variable is added, which is set to 'both' as the default selected time.

The timeOptions array is created with three options: "Morning," "Afternoon," and "Both."

The q-option-group component is updated to use selectedTime as the v-model and timeOptions as the options.

With these modifications, the option group will have three options: "Morning," "Afternoon," and "Both," and the default 
selected option will be "Both."

-->
<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="card">
        <q-card-section>
          <q-option-group
            v-model="selectedTime"
            :options="timeOptions"
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="q-pa-lg">
      <q-card v-for="(item, index) in dateTimeArray" :key="index" class="card">
        <q-card-section>
          <div class="date">{{ item.date }}</div>
        </q-card-section>

        <q-card-section>
          <div class="times">
            <q-expansion-item>
              <template v-slot:header>
                <div class="expandable-header">Times before {{ divisionTime }}</div>
              </template>

              <div class="expandable-content">
                <div class="chip" v-for="(time, chipIndex) in item.timesBefore" :key="chipIndex" @click="chipClickHandler(item.date, time)">
                  {{ time }}
                </div>
              </div>
            </q-expansion-item>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="times">
            <q-expansion-item>
              <template v-slot:header>
                <div class="expandable-header">Times after {{ divisionTime }}</div>
              </template>

              <div class="expandable-content">
                <div class="chip" v-for="(time, chipIndex) in item.timesAfter" :key="chipIndex" @click="chipClickHandler(item.date, time)">
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
import { ref, onMounted } from 'vue';

const dateTimeArray = ref([]);
const divisionTime = ref('13:22'); // Set the division time here
const selectedTime = ref('both'); // Set the default selected time here

onMounted(() => {
  dateTimeArray.value = generateDateTimeArray();
});

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

      if (currentHour < divisionHour || (currentHour === divisionHour && currentMinute < divisionMinute)) {
        timesBefore.push(timeString);
      } else {
        timesAfter.push(timeString);
      }
    }

    dateTimeArray.push({ date: dateString, timesBefore, timesAfter });
  }

  return dateTimeArray;
}

function chipClickHandler(date, time) {
  console.log('Chip clicked - Date:', date, 'Time:', time);
}

const timeOptions = [
  {
    label: 'Morning',
    value: 'morning'
  },
  {
    label: 'Afternoon',
    value: 'afternoon'
  },
  {
    label: 'Both',
    value: 'both'
  }
];
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.date {
  font-weight: bold;
}

.times {
  display: flex;
  flex-wrap: wrap;
}

.expandable-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.expandable-content {
  margin-top: 10px;
}

.chip {
  display: inline-block;
  padding: 5px;
  background-color: #cdeccd;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
  