<template>
  <div class="p-1 max-w-screen-md mx-auto">
    <CSalutation class="mb-2" />
    <CInfo />
    <DayEditor />
  </div>
</template>

<script setup lang="ts">
import DayEditor from '@/components/DayEditor.vue'
import CSalutation from '@/components/CSalutation.vue'
import CInfo from '@/components/CInfo.vue'
</script>
