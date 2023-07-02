<!-- 

-->
<template>

<div class="col-6">
  <q-card class="q-ma-md">

    <q-card-section>
      <div class="text-h6">Você tem disponibilidade pela manhã?</div>
      <q-option-group
       v-model="morningSelection"
       :options="myOptions"
       color="primary"
       inline
      >
      </q-option-group>

    </q-card-section>
    <q-space></q-space>
    <q-card-section>
      <div class="text-h6">Você tem disponibilidade à tarde?</div>
      <q-option-group
       v-model="afternoonSelection"
       
       :options="myOptions"
       color="primary"
       inline
      >
      </q-option-group>
    </q-card-section>
    <q-space></q-space>

  </q-card>
</div>


</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  propOptionShow1st: {
    type: String,
    default: ''
  },
  propOptionShow2nd: {
    type: String,
    default: ''
  },
})

const myOptions = [
    { label: 'Sim', value: 'sim' },
    { label: 'Não', value: 'nao' }
  ]

const morningSelection = ref('sim')
const afternoonSelection = ref('sim')

console.log(`  propOptionShow1st ${props.propOptionShow1st}`)
console.log(`  propOptionShow2nd ${props.propOptionShow2nd}`)

</script>
