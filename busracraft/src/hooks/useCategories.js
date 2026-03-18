import { useState, useEffect, useCallback } from 'react'
import {
  getCollection,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firebaseHelpers'
import { DEFAULT_CATEGORIES } from '../utils/constants'

const defaultIds = new Set(DEFAULT_CATEGORIES.map((c) => c.id))

export function useCategories() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCollection('categories', 'order', 'asc')
      const userAdded = data.filter((c) => !defaultIds.has(c.id))
      setCategories([...DEFAULT_CATEGORIES, ...userAdded])
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
    const maxOrder = Math.max(0, ...categories.map((c) => c.order || 0))
    const id = await addDocument('categories', {
      ...data,
      isDefault: false,
      order: maxOrder + 1,
    })
    await fetchCategories()
    return id
  }, [categories, fetchCategories])

  const updateCategory = useCallback(async (id, data) => {
    if (defaultIds.has(id)) {
      throw new Error('Varsayılan kategoriler düzenlenemez.')
    }
    await updateDocument('categories', id, data)
    await fetchCategories()
  }, [fetchCategories])

  const deleteCategory = useCallback(async (id) => {
    if (defaultIds.has(id)) {
      throw new Error('Varsayılan kategoriler silinemez.')
    }
    try {
      await deleteDocument('categories', id)
    } catch {
      // Firebase unavailable — allow local-only deletion
    }
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [categories])

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
