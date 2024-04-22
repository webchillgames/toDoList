<template>
  <div>
    <p>Your ToDo List {{ userYear }}</p>
    <button type="button" @click="toDoList.fetchList()">подтянуть {{ startDay.id }}</button>
    <DayItem v-for="(d, i) in days" :key="i" :day="d" @changeDay="changeDay" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Day, ToDoList } from '@/classes'

import DayItem from './DayItem.vue'
import type { TypeDay } from '@/types'

const startDayInput = ref<Date>(setStartDay())

const startDay = new Day(startDayInput.value, [])

const toDoList = new ToDoList(startDay.id)

const week = computed(() => toDoList.getList().value)

function setStartDay() {
  const today = new Date()
  const dayIdx = today.getDay()

  const setNearestMonday = (): Date => {
    const monday = new Date(today)
    monday.setDate(today.getDate() - dayIdx)
    return monday
  }

  let start

  if (dayIdx === 0) {
    start = today
  } else {
    start = setNearestMonday()
  }

  return start
}

const userYear = computed(() => (startDayInput.value ? startDayInput.value.getFullYear() : null))

const days = computed((): TypeDay[] => {
  if (!startDayInput.value) {
    return []
  }

  const days = setDays(startDayInput.value)

  if (week.value.length > 0) {
    console.log(666)

    return addFetchedData(days)
  }

  return days
})

function setDays(date: Date): TypeDay[] {
  const days: TypeDay[] = []

  const setNextDate = (i: number): Date => {
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + i)
    return nextDay
  }

  for (let i = 0; i < 7; i++) {
    const day = new Day(setNextDate(i), [])

    days.push(day)
  }

  return days
}

function addFetchedData(dates: TypeDay[]) {
  return dates.map((d) => {
    const data = week.value.find((v) => v.id === d.id)

    if (data !== undefined) {
      return {
        ...d,
        list: data.list
      }
    }

    return d
  })
}

function changeDay(e: TypeDay) {
  const dayIsExisted = week.value.findIndex((day) => day.id === e.id)

  console.log(dayIsExisted)

  if (dayIsExisted === -1) {
    toDoList.create({
      id: startDay.id,
      list: [e]
    })
  } else {
    console.log(e)

    // toDoList.update()
  }
}
</script>
