<template>
  <div v-if="day" class="pa-1">
    <p>{{ day.userDate }}</p>
    <input
      v-for="i in inputsQuantity"
      :key="i"
      :id="`${i - 1}`"
      type="text"
      class="w-100 d-flex ma-1"
      @input="onInput"
      :value="dayToDoList[i - 1]"
    />
    <button type="button" @click="inputsQuantity++">+</button>
    <button type="button" @click="changeDay">Сохранить</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TypeDay } from '@/types'

const emit = defineEmits(['changeDay'])

const props = defineProps<{ day: TypeDay }>()

const dayToDoList = ref<string[]>(props.day ? props.day.list : [])
const inputsQuantity = ref(props.day && props.day.list.length > 0 ? props.day.list.length : 3)

function onInput(e: Event): void {
  const input = e.target as HTMLInputElement
  dayToDoList.value[Number(input.id)] = input.value
}

function changeDay(): void {
  emit('changeDay', { ...props.day, list: dayToDoList.value })
}
</script>
