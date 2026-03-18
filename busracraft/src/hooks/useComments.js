import { useState, useCallback, useRef } from 'react'
import { getComments, addComment, deleteComment } from '../utils/socialHelpers'

export function useComments(postId, pageSize = 20) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [sending, setSending] = useState(false)
  const cursorRef = useRef(null)

  const fetchComments = useCallback(async (reset = true) => {
    if (!postId) return
    setLoading(true)
    try {
      if (reset) cursorRef.current = null
      const result = await getComments(postId, pageSize, reset ? null : cursorRef.current)
      cursorRef.current = result.lastDoc
      setHasMore(result.docs.length === pageSize)
      if (reset) {
        setComments(result.docs)
      } else {
        setComments((prev) => [...prev, ...result.docs])
      }
    } catch (err) {
      console.error('Comments fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [postId, pageSize])

  const add = useCallback(async (text, userId, profile) => {
    if (!postId || !text.trim() || sending) return
    setSending(true)
    try {
      await addComment(postId, userId, text.trim(), profile)
      await fetchComments(true)
    } finally {
      setSending(false)
    }
  }, [postId, fetchComments, sending])

  const remove = useCallback(async (commentId) => {
    try {
      await deleteComment(commentId, postId)
      setComments((prev) =>
        prev.map((c) => c.id === commentId ? { ...c, isDeleted: true } : c)
      )
    } catch (err) {
      console.error('Comment delete error:', err)
    }
  }, [postId])

  return {
    comments,
    loading,
    hasMore,
    sending,
    fetchComments,
    loadMore: () => fetchComments(false),
    add,
    remove,
  }
}
