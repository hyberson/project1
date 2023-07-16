<template>
    <div>
      <button @click="counterDescendant = counterDescendant - 1">-</button>
      <button @click="counterDescendant = 0">Reset to 0</button>
      <button @click="counterDescendant = counterDescendant + 1">+</button>
    </div>
</template>
  
<script setup>
import { watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'

const myProp = defineProps({
  counterDescendant: Number,
})
const myEmit = defineEmits(['update:counterDescendant'])

const counterDescendant = useVModel(myProp, 'counterDescendant', myEmit)
watchEffect(() => console.log(counterDescendant.value))
</script>
