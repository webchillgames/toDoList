import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  databaseURL: 'https://todolist-8798f-default-rtdb.firebaseio.com'
}

const app = initializeApp(firebaseConfig)
export const fbdb = getDatabase(app)
