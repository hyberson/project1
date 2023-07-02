<!-- This code generates a set of cards with dates and corresponding times. The times are divided into two sections: 
  "Times before" and "Times after" a specified division time. The generated data is reactive, and 
  the chipClickHandler function handles click events on the time chips. -->
<template>
  <q-page>
  <div>
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
              <div class="chip" v-for="time in item.timesBefore" :key="time" @click="chipClickHandler(item.date, time)">
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
              <div class="chip" v-for="time in item.timesAfter" :key="time" @click="chipClickHandler(item.date, time)">
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
  gap: 5px;
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
  background-color: #e0e0e0;
  cursor: pointer;
}
</style>
