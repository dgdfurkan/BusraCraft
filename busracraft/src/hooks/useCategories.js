import { useState, useEffect, useCallback } from 'react'
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firebaseHelpers'
import { DEFAULT_CATEGORIES } from '../utils/constants'

export function useCategories() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCollection('categories', 'order', 'asc')
      if (data.length === 0) {
        try {
          for (const cat of DEFAULT_CATEGORIES) {
            await addDocument('categories', cat)
          }
          const refreshed = await getCollection('categories', 'order', 'asc')
          setCategories(refreshed.length > 0 ? refreshed : DEFAULT_CATEGORIES)
        } catch {
          setCategories(DEFAULT_CATEGORIES)
        }
      } else {
        setCategories(data)
      }
    } catch {
      setCategories(DEFAULT_CATEGORIES)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const addCategory = useCallback(async (data) => {
    const id = await addDocument('categories', {
      ...data,
      isDefault: false,
      order: categories.length + 1,
    })
    await fetchCategories()
    return id
  }, [categories.length, fetchCategories])

  const updateCategory = useCallback(async (id, data) => {
    await updateDocument('categories', id, data)
    await fetchCategories()
  }, [fetchCategories])

  const deleteCategory = useCallback(async (id) => {
    try {
      await deleteDocument('categories', id)
    } catch {
      // Firebase unavailable — allow local-only deletion
    }
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const getCategoryByKey = useCallback(
    (key) => categories.find((c) => c.id === key || c.name === key),
    [categories]
  )

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryByKey,
    refresh: fetchCategories,
  }
}
