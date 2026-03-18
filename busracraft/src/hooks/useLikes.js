import { useState, useEffect, useCallback } from 'react'
import { toggleLike, checkUserLiked } from '../utils/socialHelpers'

export function useLikes(postId, userId) {
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!postId || !userId) {
      setLiked(false)
      return
    }
    checkUserLiked(postId, userId).then(setLiked).catch(() => {})
  }, [postId, userId])

  const toggle = useCallback(async () => {
    if (!userId || loading) return
    const prevLiked = liked
    setLiked(!prevLiked)
    setLoading(true)
    try {
      await toggleLike(postId, userId)
    } catch {
      setLiked(prevLiked)
    } finally {
      setLoading(false)
    }
  }, [postId, userId, liked, loading])

  return { liked, toggle, loading }
}
