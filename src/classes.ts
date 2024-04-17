import { fbdb } from '@/firebase'
import { ref, set } from 'firebase/database'

export class Day {
  date: Date
  id: string

  constructor(date: Date) {
    this.date = date
    this.id = this.setId(date)
  }

  setId(date: Date): string {
    const d = date.getDate()
    const m = date.getMonth()
    const y = date.getFullYear()

    return `${d}${m}${y}`
  }

  writeDayData(text: string): void {
    set(ref(fbdb, 'list/' + this.id), {
      id: this.id,
      text: text
    })
  }
}
