import { useState, useEffect, useCallback } from 'react'
import {
  getCollection,
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firebaseHelpers'

export function useLists() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLists = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCollection('lists', 'createdAt', 'desc')
      setLists(data)
    } catch {
      setLists([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLists()
  }, [fetchLists])

  const getList = useCallback(async (id) => {
    return getDocument('lists', id)
  }, [])

  const addList = useCallback(async (data) => {
    const id = await addDocument('lists', {
      ...data,
      recipeIds: data.recipeIds || [],
    })
    await fetchLists()
    return id
  }, [fetchLists])

  const updateList = useCallback(async (id, data) => {
    await updateDocument('lists', id, data)
    await fetchLists()
  }, [fetchLists])

  const deleteList = useCallback(async (id) => {
    await deleteDocument('lists', id)
    setLists((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const addRecipeToList = useCallback(async (listId, recipeId) => {
    const list = await getDocument('lists', listId)
    if (!list) return
    const recipeIds = list.recipeIds || []
    if (!recipeIds.includes(recipeId)) {
      await updateDocument('lists', listId, {
        recipeIds: [...recipeIds, recipeId],
      })
      await fetchLists()
    }
  }, [fetchLists])

  const removeRecipeFromList = useCallback(async (listId, recipeId) => {
    const list = await getDocument('lists', listId)
    if (!list) return
    await updateDocument('lists', listId, {
      recipeIds: (list.recipeIds || []).filter((id) => id !== recipeId),
    })
    await fetchLists()
  }, [fetchLists])

  return {
    lists,
    loading,
    getList,
    addList,
    updateList,
    deleteList,
    addRecipeToList,
    removeRecipeFromList,
    refresh: fetchLists,
  }
}
