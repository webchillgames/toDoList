<template>
  <div class="mt-5">
    <div class="grid grid-cols-2 gap-2">
      <VueDatePicker
        v-model="date"
        :enable-time-picker="false"
        auto-apply
        :clearable="false"
        input-class-name="dp-custom-input"
        menu-class-name="dp-custom-menu"
        calendar-class-name="dp-custom-calendar"
        calendar-cell-class-name="dp-custom-cell"
      />

      <button
        @click="update"
        type="button"
        class="bg-purple-300 hover:bg-purple-400 rounded-lg p-1 text-white"
      >
        update tasks
      </button>
    </div>

    <div class="mb-5">
      <input
        v-for="i in inputs"
        :key="i"
        @change="appendToDoList"
        :value="setValue(i - 1)"
        type="text"
        class="w-full border-purple-300 border p-2 rounded-lg block my-3"
      />

      <div class="grid grid-cols-2 gap-2">
        <button
          type="button"
          class="bg-purple-300 hover:bg-purple-400 rounded-lg p-1 text-white"
          @click="inputs++"
        >
          add field
        </button>
        <button
          type="button"
          @click="save"
          class="bg-indigo-300 hover:bg-indigo-400 rounded-lg p-1 text-white"
        >
          save day
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fbdb } from '@/firebase'
import { ref as firebaseRef, set, get, child } from 'firebase/database'
// import { daysTitles, monthTitles } from '@/dictionaries'
import { ref } from 'vue'

const date = ref(new Date())
const toDoList = ref<string[]>([])
const inputs = ref<number>(3)
const dayId: string = setDayId(date.value)
// const dayTitle: string = setUserDayTitle(date.value)
// const calendarIsVisible = ref(false)

function appendToDoList(e: Event) {
  const input = e.target as HTMLInputElement
  toDoList.value.push(input.value)
}

// function setUserDayTitle(date: Date | undefined): string {
//   if (!date) {
//     return ''
//   }
//   return `${daysTitles[date.getDay()]} ${date.getDate()} ${monthTitles[date.getMonth()]}`
// }

function setDayId(date: Date | undefined): string {
  if (!date) {
    return ''
  }

  return `${date.getDate()}${date.getMonth()}${date.getFullYear()}`
}

async function save(): Promise<void> {
  try {
    await create()
  } catch (e) {
    console.log(e)
  }
}

async function create(): Promise<void> {
  return set(firebaseRef(fbdb, 'toDoList/' + dayId), toDoList.value)
}

async function update() {
  try {
    const snapshot = await fetch()
    if (snapshot.exists()) {
      toDoList.value = snapshot.val()
      inputs.value = toDoList.value.length
    } else {
      console.log('No data available')
    }
  } catch (e) {
    console.error(e)
  }
}

async function fetch() {
  console.log(dayId)

  const dbRef = firebaseRef(fbdb)

  return get(child(dbRef, `toDoList/${dayId}`))
}

function setValue(i: number): string {
  console.log(i)
  console.log(toDoList.value[i] ? `${toDoList.value[i]}` : '')
  return toDoList.value[i] ? `${toDoList.value[i]}` : ''
}
</script>

<style lang="scss">
.dp-custom-input.dp__input {
  border-color: rgb(165, 180, 252);
  border-radius: 8px;

  &:hover {
    border-color: rgb(129, 140, 248);
  }
}

.dp-custom-menu.dp__menu {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid rgb(165, 180, 252);
}

.dp-custom-calendar {
  .dp__calendar_item {
    &:hover {
      border-color: rgb(165, 180, 252);
    }
  }
}

.dp-custom-cell {
  &.dp__today {
    border-radius: 50%;
    border-color: rgb(165, 180, 252);
    background-color: rgba(165, 180, 252, 0.1);
    color: rgb(165, 180, 252);
  }

  &.dp__date_hover_end:hover,
  &.dp__date_hover_start:hover,
  &.dp__date_hover:hover {
    background-color: rgba(165, 180, 252, 0.1);
  }

  &:hover {
    background-color: rgba(165, 180, 252, 0.1);
  }
}
</style>
