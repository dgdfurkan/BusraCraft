import { useState, useEffect, useCallback, useRef } from 'react'
import { getSocialPosts, getPublicMembers } from '../utils/socialHelpers'

export function useSocialFeed(pageSize = 20) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [filters, setFilters] = useState({ category: '', ownerUid: '', timeRange: '' })
  const [members, setMembers] = useState([])
  const cursorRef = useRef(null)

  const fetchPosts = useCallback(async (reset = true) => {
    try {
      if (reset) {
        setLoading(true)
        cursorRef.current = null
      } else {
        setLoadingMore(true)
      }

      const activeFilters = {}
      if (filters.category) activeFilters.category = filters.category
      if (filters.ownerUid) activeFilters.ownerUid = filters.ownerUid

      const result = await getSocialPosts(
        activeFilters,
        pageSize,
        reset ? null : cursorRef.current
      )

      cursorRef.current = result.lastDoc
      setHasMore(result.docs.length === pageSize)

      if (reset) {
        setPosts(result.docs)
      } else {
        setPosts((prev) => [...prev, ...result.docs])
      }
    } catch (err) {
      console.error('Social feed error:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [filters, pageSize])

  useEffect(() => {
    fetchPosts(true)
  }, [fetchPosts])

  useEffect(() => {
    getPublicMembers().then(setMembers).catch(() => {})
  }, [])

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) fetchPosts(false)
  }, [fetchPosts, loadingMore, hasMore])

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters({ category: '', ownerUid: '', timeRange: '' })
  }, [])

  return {
    posts,
    loading,
    loadingMore,
    hasMore,
    filters,
    members,
    loadMore,
    updateFilter,
    resetFilters,
    refresh: () => fetchPosts(true),
  }
}
