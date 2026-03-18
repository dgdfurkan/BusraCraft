import { initializeApp } from 'firebase/app'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const DUMMY_VALUES = ['', 'undefined', 'null', 'your_api_key_here', 'your_project_id', 'xxx', 'placeholder']
const isDummy = (v) => !v || DUMMY_VALUES.includes(String(v).toLowerCase())
const isDummyConfig = isDummy(firebaseConfig.apiKey) || isDummy(firebaseConfig.projectId)

let app = null
let db = null
let auth = null

if (!isDummyConfig) {
  app = initializeApp(firebaseConfig)
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  })
  auth = getAuth(app)
}

export { db, auth }
export default app
