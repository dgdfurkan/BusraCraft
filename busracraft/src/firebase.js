import { initializeApp } from 'firebase/app'
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const isDummyConfig = !firebaseConfig.apiKey
  || firebaseConfig.apiKey === 'your_api_key_here'
  || !firebaseConfig.projectId
  || firebaseConfig.projectId === 'your_project_id'

let app = null
let db = null
let storage = null

if (!isDummyConfig) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  storage = getStorage(app)

  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Offline persistence: multiple tabs open')
    } else if (err.code === 'unimplemented') {
      console.warn('Offline persistence: browser not supported')
    }
  })
}

export { db, storage }
export default app
