import { useState, useEffect, useCallback } from 'react'
import {
  getUserCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionSaves,
} from '../utils/socialHelpers'
import { getDocument } from '../utils/firebaseHelpers'

const DEFAULT_COLLECTION_NAME = 'Favoriler'
const DEFAULT_COLLECTION_EMOJI = '❤️'

export function useCollections(userId) {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCollections = useCallback(async () => {
    if (!userId) {
      setCollections([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const result = await getUserCollections(userId)
      let cols = result.docs

      const hasDefault = cols.some((c) => c.name === DEFAULT_COLLECTION_NAME)
      if (!hasDefault) {
        await createCollection(userId, DEFAULT_COLLECTION_NAME, DEFAULT_COLLECTION_EMOJI)
        const refreshed = await getUserCollections(userId)
        cols = refreshed.docs
      }

      setCollections(cols)
    } catch (err) {
      console.warn('Collections fetch error:', err)
      setCollections([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchCollections()
  }, [fetchCollections])

  const add = useCallback(async (name, emoji = '📌') => {
    if (!userId) return
    await createCollection(userId, name, emoji)
    await fetchCollections()
  }, [userId, fetchCollections])

  const update = useCallback(async (collectionId, data) => {
    await updateCollection(collectionId, data)
    await fetchCollections()
  }, [fetchCollections])

  const remove = useCallback(async (collectionId) => {
    await deleteCollection(collectionId)
    setCollections((prev) => prev.filter((c) => c.id !== collectionId))
  }, [])

  const getSaves = useCallback(async (collectionId) => {
    const result = await getCollectionSaves(collectionId)
    const posts = await Promise.all(
      result.docs.map(async (save) => {
        const post = await getDocument('socialPosts', save.postId)
        return post ? { ...post, saveId: save.id } : null
      })
    )
    return posts.filter(Boolean)
  }, [])

  return {
    collections,
    loading,
    add,
    update,
    remove,
    getSaves,
    refresh: fetchCollections,
  }
}
