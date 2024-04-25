<template>
  <div class="p-1 pt-3 max-w-screen-md mx-auto">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-2 rounded-lg bg-yellow-200 flex justify-between">
        <span>Today</span>
        <span>6</span>
      </div>

      <div class="p-2 rounded-lg bg-green-200 flex justify-between">
        <span>Scheduled</span>
        <span>6</span>
      </div>

      <div class="p-2 rounded-lg bg-blue-200 flex justify-between">
        <span>All</span>
        <span>8</span>
      </div>
      <div class="p-2 rounded-lg bg-pink-200 flex justify-between">
        <span>Overdue</span>
        <span>2</span>
      </div>
    </div>

    <DayEditor />
  </div>
</template>

<script setup lang="ts">
import DayEditor from './DayEditor.vue'
</script>
