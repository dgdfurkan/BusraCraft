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
  const profile = { ...DEFAULT_PROFILE, ...(existing || {}), ...data }

  if (existing) {
    const hasUpdates = (data.displayName !== undefined && data.displayName !== existing.displayName) ||
      (data.avatarUrl !== undefined && data.avatarUrl !== existing.avatarUrl)
    if (hasUpdates) {
      await updateDocument(USERS_COLLECTION, uid, {
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
      })
    }
    return { id: uid, ...profile }
  }

  await setDocument(USERS_COLLECTION, uid, {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }, false)
  return { id: uid, ...profile }
}

export async function getUserProfile(uid) {
  if (!uid) return null
  return getDocument(USERS_COLLECTION, uid)
}

export async function updateUserProfile(uid, data) {
  await updateDocument(USERS_COLLECTION, uid, data)
}
