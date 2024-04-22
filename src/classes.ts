import { fbdb } from '@/firebase'
import { ref, type Ref } from 'vue'
import { ref as fbRef, set, child, get, update, push } from 'firebase/database'
import type { TypeWeekCreate, TypeDay } from '@/types'
import { weekTitles, monthTitles } from '@/dictionaries'

export class ToDoList {
  start: string
  _list: Ref<TypeDay[]>

  constructor(start: string) {
    this.start = start
    this._list = ref([])
  }

  fetchList(): void {
    const dbRef = fbRef(fbdb)

    get(child(dbRef, `list/${this.start}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          this._list.value = snapshot.val()
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  getList() {
    return this._list
  }

  create(week: TypeWeekCreate): void {
    // const db = getDatabase();
    const weekListRef = fbRef(fbdb, 'list/' + week.id)

    // week.list.forEach(item => {
    //   // Для каждого элемента создаем уникальный ключ в подпапке week.id
    //   const newItemRef = push(weekListRef);
    //   set(newItemRef, item);
    // });
    set(fbRef(fbdb, 'list/' + week.id), week.list)
  }

  updateList(listId: string, dayIdx: string, list: string[]): void {
    // const updates = {
    //   [`list/${listId}/${dayIdx}/list`]: list
    // }
    // updates['/list/' + listId + dayIdx + '/list'] = list
    // const newPostKey = push(child(fbRef(fbdb), 'list')).key
    // console.log(newPostKey)
    // update(fbRef(fbdb), updates)
  }
}

export class Day {
  date: Date
  id: string
  userDate: string
  list: Ref<string[]>

  constructor(date: Date, list: string[]) {
    this.date = date
    this.id = this.setDayId()
    this.userDate = this.setUserDayTitle()
    this.list = ref(list)
  }

  setDayId(): string {
    const d = this.date.getDate()
    const m = this.date.getMonth()
    const y = this.date.getFullYear()
    return `${d}${m}${y}`
  }

  setUserDayTitle(): string {
    return `${weekTitles[this.date.getDay()]} ${this.date.getDate()} ${monthTitles[this.date.getMonth()]}`
  }
}
