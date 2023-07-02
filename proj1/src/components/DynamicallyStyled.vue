<template>
  <div>
    <q-btn :class="classObject" label="Press me" @click="triggerError"></q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Error {
type: string
}

const isActive = ref(true)
const error = ref<Error | null>(null)

const classObject = computed(() => ({
active: isActive.value && !error.value,
'text-danger': error.value && error.value.type === 'fatal',
}))

// Function to mutate error ref to trigger text-danger class
const triggerError = () => {
error.value = { type: 'fatal' }
}
</script>

<style scoped>
.text-danger {
color: yellow;
background-color: red;
}
</style>
