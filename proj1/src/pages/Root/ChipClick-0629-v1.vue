<template>
  <q-page>
    <div>
      <q-card v-for="(item, index) in dateTimeArray" :key="index" class="card">
        <q-card-section>
          <div class="date">{{ item.date }}</div>
        </q-card-section>

        <q-card-section>
          <div class="times">
            <div class="chip" v-for="time in item.timesBefore12" :key="time" @click="chipClickHandler(item.date, time)">
              {{ time }}
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="times">
            <div class="chip" v-for="time in item.timesAfter12" :key="time" @click="chipClickHandler(item.date, time)">
              {{ time }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dateTimeArray = ref([]);

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

    const timesBefore12 = [];
    const timesAfter12 = [];

    for (let hour = 8; hour <= 18; hour++) {
      const timeString = hour.toString().padStart(2, '0') + ':00';

      if (hour <= 12) {
        timesBefore12.push(timeString);
      } else {
        timesAfter12.push(timeString);
      }
    }

    dateTimeArray.push({ date: dateString, timesBefore12, timesAfter12 });
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

.chip {
  display: inline-block;
  padding: 5px;
  background-color: #4de67d;
  cursor: pointer;
}
</style>
