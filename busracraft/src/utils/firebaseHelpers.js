import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'
import { trackRead, trackWrite } from './quotaTracker'

function ensureDb() {
  if (!db) throw new Error('Firebase yapılandırılmamış. .env dosyasını kontrol edin.')
}

function ensureStorage() {
  if (!storage) throw new Error('Firebase Storage yapılandırılmamış.')
}

export async function getCollection(collectionName, sortField = 'createdAt', sortDir = 'desc') {
  ensureDb()
  trackRead()
  const q = query(collection(db, collectionName), orderBy(sortField, sortDir))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getDocument(collectionName, docId) {
  ensureDb()
  trackRead()
  const snap = await getDoc(doc(db, collectionName, docId))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function addDocument(collectionName, data) {
  ensureDb()
  trackWrite()
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateDocument(collectionName, docId, data) {
  ensureDb()
  trackWrite()
  await updateDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteDocument(collectionName, docId) {
  ensureDb()
  trackWrite()
  await deleteDoc(doc(db, collectionName, docId))
}

export async function uploadImage(file, path) {
  ensureStorage()
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return getDownloadURL(snapshot.ref)
}

export async function deleteImage(url) {
  if (!storage) return
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch {
    // silently ignore
  }
}
