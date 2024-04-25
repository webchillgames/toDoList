<template>
  <div>
    <p>Hello, friend!</p>
    <p class="text-gray-400">Today: {{ todayTitle }}</p>
  </div>
</template>

<script lang="ts" setup>
import { daysTitles, monthTitles } from '@/dictionaries'

const todayTitle: string = setUserDayTitle()

function setUserDayTitle(): string {
  const today = new Date()

  return `${daysTitles[today.getDay()]} ${today.getDate()} ${monthTitles[today.getMonth()]}`
}
</script>

<style lang="scss"></style>
