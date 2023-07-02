/* 
======================================================================================================

<template>
  <q-page>
    <div class="q-pa-lg">
      <q-card class="card">
        <q-card-section class="fixed-card-1" style="font-size: 16px;">
          <div class="q-mb-md" style="font-size: 22px; font-weight: bold;">Mostrar quais horários?</div>
          <!-- Option Group to Select 'Morning', 'Afternoon', or 'Both' -->
          <q-option-group
            v-model="selectedTime"
            :options="timeOptions"
            color="primary"
            style="font-size: 20px;"
          />
        </q-card-section> 
        <q-card-section>
          <q-chip
            v-for="(time, index) in timeOptions"
            :key="index"
            :label="time.label"
            :color="getChipColor(time.value)"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';

const selectedTime = ref(null);
const timeOptions = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
  { label: 'Both', value: 'both' },
];

const getChipColor = (timeValue) => {
  if (timeValue === selectedTime.value) {
    return 'blue';
  } else {
    return 'default';
  }
};

const chipColor = computed(() => {
  return getChipColor();
});
script>

====================================================================================================== */

