<template>
  <div class="day">
    <p>{{ date }}</p>
    <input type="text" v-model="input" />
    <button type="button" @click="day.writeDayData(input)">Отправить</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Day } from '@/classes'

const props = defineProps({
  date: Date
})
const input = ref('')

const day = new Day(props.date)
</script>

<style lang="scss">
.day {
  padding: 8px;
}
</style>
