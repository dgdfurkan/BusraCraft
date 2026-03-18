import { useState, useEffect, useCallback } from 'react'
import { saveToCollection, removeFromCollection, checkUserSaved } from '../utils/socialHelpers'

export function useSaves(postId, userId) {
  const [saved, setSaved] = useState(false)
  const [saveId, setSaveId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!postId || !userId) {
      setSaved(false)
      setSaveId(null)
      return
    }
    checkUserSaved(postId, userId).then((result) => {
      setSaved(result.saved)
      setSaveId(result.saveId)
    }).catch(() => {})
  }, [postId, userId])

  const save = useCallback(async (collectionId) => {
    if (!userId || loading) return
    setLoading(true)
    try {
      const id = await saveToCollection(postId, collectionId, userId)
      setSaved(true)
      setSaveId(id)
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setLoading(false)
    }
  }, [postId, userId, loading])

  const unsave = useCallback(async () => {
    if (!saveId || loading) return
    setLoading(true)
    try {
      await removeFromCollection(saveId, postId)
      setSaved(false)
      setSaveId(null)
    } catch (err) {
      console.error('Unsave error:', err)
    } finally {
      setLoading(false)
    }
  }, [saveId, postId, loading])

  return { saved, saveId, save, unsave, loading }
}
