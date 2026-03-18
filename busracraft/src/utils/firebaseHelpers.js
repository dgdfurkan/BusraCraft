import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  runTransaction,
  writeBatch,
  increment,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase'
import { trackRead, trackWrite } from './quotaTracker'

function ensureDb() {
  if (!db) throw new Error('Firebase yapılandırılmamış. .env dosyasını kontrol edin.')
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

export async function setDocument(collectionName, docId, data, merge = true) {
  ensureDb()
  trackWrite()
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge })
}

export async function queryDocuments(collectionName, constraints = [], sortField, sortDir = 'desc', pageSize, cursor) {
  ensureDb()
  trackRead()
  const parts = [collection(db, collectionName)]
  constraints.forEach((c) => parts.push(where(c.field, c.op, c.value)))
  if (sortField) parts.push(orderBy(sortField, sortDir))
  if (cursor) parts.push(startAfter(cursor))
  if (pageSize) parts.push(limit(pageSize))
  const snapshot = await getDocs(query(...parts))
  return {
    docs: snapshot.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    empty: snapshot.empty,
  }
}

export async function executeTransaction(updateFn) {
  ensureDb()
  trackWrite()
  return runTransaction(db, updateFn)
}

export function getDocRef(collectionName, docId) {
  return doc(db, collectionName, docId)
}

export function getCollectionRef(collectionName) {
  return collection(db, collectionName)
}

export function createBatch() {
  ensureDb()
  return writeBatch(db)
}

export { serverTimestamp, increment, doc, query, where, orderBy, limit, startAfter, getDocs, getDoc, collection }
