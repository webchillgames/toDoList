export type TypeWeek = {
  list: TypeDay[]
}

export type TypeWeekCreate = {
  list: TypeDay[]
  id: string
}

export type TypeDay = {
  date: Date
  id: string
  userDate: string
  list: string[]
}
