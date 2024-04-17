<template>
  <div>
    <DayItem v-for="(date, i) in week" :key="i" :date="date" />

    <!-- TO DO LIST:
    7 окошек дней
    могут перелистываться 
    можно переключаться скачком на выбранный день

    круд с firebase -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DayItem from '@/components/DayItem.vue'
import { onMounted } from 'vue'

const week = ref<Date[]>([])

function setCurrentWeek(): void {
  const today = new Date()
  const day = today.getDay()

  const days: Date[] = []
  let start

  if (day === 0) {
    days.push(today)
    start = today
  } else {
    const monday = new Date(today)
    monday.setDate(today.getDate() - day)
    start = monday
  }

  const remindDays: Date[] = setDays(start)
  days.push(...remindDays)

  week.value = days
}

function setDays(start: Date): Date[] {
  const remindDays: Date[] = []

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(start)
    nextDay.setDate(start.getDate() + i)

    remindDays.push(nextDay)
  }

  return remindDays
}

onMounted(setCurrentWeek)
</script>

<style lang="scss"></style>
