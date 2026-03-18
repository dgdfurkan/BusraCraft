import { setDocument, getDocument, updateDocument } from './firebaseHelpers'
import { serverTimestamp } from 'firebase/firestore'

const USERS_COLLECTION = 'users'

const DEFAULT_PROFILE = {
  displayName: '',
  avatarUrl: '',
  bio: '',
  role: 'visitor',
  stats: { recipeCount: 0, likeCount: 0 },
}

// Giriş/kayıt sırasında SADECE bunlar güncellenir. role ASLA buradan değiştirilmez.
const ALLOWED_ON_LOGIN = ['displayName', 'avatarUrl']

export async function createUserProfile(uid, data = {}) {
  const existing = await getDocument(USERS_COLLECTION, uid)
  const safeData = Object.fromEntries(
    Object.entries(data).filter(([k]) => ALLOWED_ON_LOGIN.includes(k))
  )
  const profile = { ...DEFAULT_PROFILE, ...(existing || {}), ...safeData }

  if (existing) {
    const hasUpdates = (safeData.displayName !== undefined && safeData.displayName !== existing.displayName) ||
      (safeData.avatarUrl !== undefined && safeData.avatarUrl !== existing.avatarUrl)
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
