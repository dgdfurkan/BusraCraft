import {
  addDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  executeTransaction,
  getDocRef,
  getCollectionRef,
  serverTimestamp,
  increment,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from './firebaseHelpers'
import { db } from '../firebase'

export async function createSocialPost(recipe, userProfile) {
  const postData = {
    recipeId: recipe.id,
    ownerUid: userProfile.id || userProfile.uid,
    ownerName: userProfile.displayName || 'Anonim',
    ownerAvatar: userProfile.avatarUrl || '',
    title: recipe.title || '',
    coverImageUrl: recipe.photos?.[0] || '',
    excerpt: recipe.steps?.[0]?.text?.substring(0, 120) || '',
    category: recipe.category || '',
    tags: recipe.tags || [],
    likeCount: 0,
    commentCount: 0,
    saveCount: 0,
    isPublic: true,
  }
  return addDocument('socialPosts', postData)
}

export async function deleteSocialPostByRecipe(recipeId) {
  const result = await queryDocuments('socialPosts', [
    { field: 'recipeId', op: '==', value: recipeId },
  ])
  for (const post of result.docs) {
    await deleteDocument('socialPosts', post.id)
  }
}

export async function getSocialPosts(filters = {}, pageSize = 20, cursor = null) {
  const constraints = [{ field: 'isPublic', op: '==', value: true }]
  if (filters.category) {
    constraints.push({ field: 'category', op: '==', value: filters.category })
  }
  if (filters.ownerUid) {
    constraints.push({ field: 'ownerUid', op: '==', value: filters.ownerUid })
  }
  return queryDocuments('socialPosts', constraints, 'createdAt', 'desc', pageSize, cursor)
}

export async function toggleLike(postId, userId) {
  if (!db) throw new Error('Firebase yapılandırılmamış.')

  const likesRef = collection(db, 'likes')
  const q = query(likesRef, where('postId', '==', postId), where('userId', '==', userId))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    const likeDoc = snapshot.docs[0]
    await executeTransaction(async (transaction) => {
      transaction.delete(doc(db, 'likes', likeDoc.id))
      transaction.update(doc(db, 'socialPosts', postId), {
        likeCount: increment(-1),
      })
    })
    return false
  } else {
    await executeTransaction(async (transaction) => {
      const newLikeRef = doc(collection(db, 'likes'))
      transaction.set(newLikeRef, {
        postId,
        userId,
        createdAt: serverTimestamp(),
      })
      transaction.update(doc(db, 'socialPosts', postId), {
        likeCount: increment(1),
      })
    })
    return true
  }
}

export async function checkUserLiked(postId, userId) {
  if (!userId) return false
  const result = await queryDocuments('likes', [
    { field: 'postId', op: '==', value: postId },
    { field: 'userId', op: '==', value: userId },
  ], null, 'desc', 1)
  return !result.empty
}

export async function addComment(postId, userId, text, profile) {
  await executeTransaction(async (transaction) => {
    const commentRef = doc(collection(db, 'comments'))
    transaction.set(commentRef, {
      postId,
      userId,
      authorName: profile.displayName || 'Anonim',
      authorAvatar: profile.avatarUrl || '',
      text,
      isDeleted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    transaction.update(doc(db, 'socialPosts', postId), {
      commentCount: increment(1),
    })
  })
}

export async function deleteComment(commentId, postId) {
  await executeTransaction(async (transaction) => {
    transaction.update(doc(db, 'comments', commentId), {
      isDeleted: true,
      updatedAt: serverTimestamp(),
    })
    transaction.update(doc(db, 'socialPosts', postId), {
      commentCount: increment(-1),
    })
  })
}

export async function getComments(postId, pageSize = 20, cursor = null) {
  return queryDocuments('comments', [
    { field: 'postId', op: '==', value: postId },
  ], 'createdAt', 'desc', pageSize, cursor)
}

export async function saveToCollection(postId, collectionId, userId) {
  const result = await queryDocuments('saves', [
    { field: 'postId', op: '==', value: postId },
    { field: 'userId', op: '==', value: userId },
    { field: 'collectionId', op: '==', value: collectionId },
  ], null, 'desc', 1)

  if (!result.empty) return result.docs[0].id

  const id = await addDocument('saves', {
    postId,
    collectionId,
    userId,
  })

  await updateDocument('socialPosts', postId, {
    saveCount: increment(1),
  })
  return id
}

export async function removeFromCollection(saveId, postId) {
  await deleteDocument('saves', saveId)
  try {
    await updateDocument('socialPosts', postId, {
      saveCount: increment(-1),
    })
  } catch { /* post might be deleted */ }
}

export async function checkUserSaved(postId, userId) {
  if (!userId) return { saved: false, saveId: null }
  const result = await queryDocuments('saves', [
    { field: 'postId', op: '==', value: postId },
    { field: 'userId', op: '==', value: userId },
  ], null, 'desc', 1)
  if (result.empty) return { saved: false, saveId: null }
  return { saved: true, saveId: result.docs[0].id }
}

export async function getUserCollections(userId) {
  return queryDocuments('collections', [
    { field: 'userId', op: '==', value: userId },
  ], 'createdAt', 'desc')
}

export async function createCollection(userId, name, emoji = '📌') {
  return addDocument('collections', {
    userId,
    name,
    emoji,
  })
}

export async function updateCollection(collectionId, data) {
  return updateDocument('collections', collectionId, data)
}

export async function deleteCollection(collectionId) {
  return deleteDocument('collections', collectionId)
}

export async function getCollectionSaves(collectionId, pageSize = 50, cursor = null) {
  return queryDocuments('saves', [
    { field: 'collectionId', op: '==', value: collectionId },
  ], 'createdAt', 'desc', pageSize, cursor)
}

export async function getPublicMembers() {
  const result = await queryDocuments('socialPosts', [
    { field: 'isPublic', op: '==', value: true },
  ], 'createdAt', 'desc', 100)

  const memberMap = new Map()
  result.docs.forEach((post) => {
    if (!memberMap.has(post.ownerUid)) {
      memberMap.set(post.ownerUid, {
        uid: post.ownerUid,
        displayName: post.ownerName,
        avatarUrl: post.ownerAvatar,
      })
    }
  })
  return Array.from(memberMap.values())
}
