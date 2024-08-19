import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAtvVXVWUuJwV2oNDmEXkOLFAPmplXjhq8',
  authDomain: 'users-dcbab.firebaseapp.com',
  projectId: 'users-dcbab',
  storageBucket: 'users-dcbab.appspot.com',
  messagingSenderId: '247088992158',
  appId: '1:247088992158:web:26a93e68afc1cc01f3508f',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { auth, db, storage }
