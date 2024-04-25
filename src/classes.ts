import { fbdb } from '@/firebase'
import { ref, type Ref } from 'vue'
import { ref as firebaseRef, set, child, get } from 'firebase/database'
import type { TypeWeek, TypeDay } from '@/types'
import { daysTitles, monthTitles } from '@/dictionaries'

export class ToDoList {
  start: string
  _week = ref<TypeWeek>()

  constructor(start: string) {
    this.start = start
  }

  async fetchList(): Promise<void> {
    const dbRef = firebaseRef(fbdb)

    try {
      const snapshot = await get(child(dbRef, `toDoList/${this.start}`))
      if (snapshot.exists()) {
        this._week.value = snapshot.val()
      } else {
        console.log('No data available')
      }
    } catch (e) {
      console.error(e)
    }
  }

  getWeek(): TypeWeek {
    return this._week.value
  }

  async create(week: TypeWeek): Promise<void> {
    set(firebaseRef(fbdb, 'toDoList/' + week.id), week)
  }

  updateList(listId: string, dayIdx: string, list: string[]): void {
    // const updates = {
    //   [`list/${listId}/${dayIdx}/list`]: list
    // }
    // updates['/list/' + listId + dayIdx + '/list'] = list
    // const newPostKey = push(child(firebaseRef(fbdb), 'list')).key
    // console.log(newPostKey)
    // update(firebaseRef(fbdb), updates)
  }
}

export class Day {
  date: Date
  id: string
  userDate: string
  _toDoList = ref<string[]>([])

  constructor(date: Date) {
    this.date = date
    this.id = this.setDayId()
    this.userDate = this.setUserDayTitle()
  }

  setList(list: string[]) {
    this._toDoList.value = list
  }

  getToDoList() {
    return this._toDoList
  }

  setDayId(): string {
    const d = this.date.getDate()
    const m = this.date.getMonth()
    const y = this.date.getFullYear()
    return `${d}${m}${y}`
  }

  setUserDayTitle(): string {
    return `${daysTitles[this.date.getDay()]} ${this.date.getDate()} ${monthTitles[this.date.getMonth()]}`
  }
}
