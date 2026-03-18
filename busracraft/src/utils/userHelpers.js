import { setDocument, getDocument, updateDocument } from './firebaseHelpers'
import { serverTimestamp } from 'firebase/firestore'

const USERS_COLLECTION = 'users'

const DEFAULT_PROFILE = {
  displayName: '',
  avatarUrl: '',
  bio: '',
  role: 'visitor',
  isMember: false,
  stats: { recipeCount: 0, likeCount: 0 },
}

export async function createUserProfile(uid, data = {}) {
  const existing = await getDocument(USERS_COLLECTION, uid)
  if (existing) return existing

  const profile = {
    ...DEFAULT_PROFILE,
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  await setDocument(USERS_COLLECTION, uid, profile, false)
  return { id: uid, ...profile }
}

export async function getUserProfile(uid) {
  if (!uid) return null
  return getDocument(USERS_COLLECTION, uid)
}

export async function updateUserProfile(uid, data) {
  await updateDocument(USERS_COLLECTION, uid, data)
}
