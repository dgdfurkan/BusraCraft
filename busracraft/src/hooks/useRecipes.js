import { useState, useEffect, useCallback } from 'react'
import {
  getCollection,
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firebaseHelpers'

export function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getCollection('recipes', 'createdAt', 'desc')
      setRecipes(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const getRecipe = useCallback(async (id) => {
    return getDocument('recipes', id)
  }, [])

  const addRecipe = useCallback(async (data) => {
    const id = await addDocument('recipes', data)
    await fetchRecipes()
    return id
  }, [fetchRecipes])

  const updateRecipe = useCallback(async (id, data) => {
    await updateDocument('recipes', id, data)
    await fetchRecipes()
  }, [fetchRecipes])

  const deleteRecipe = useCallback(async (id) => {
    await deleteDocument('recipes', id)
    setRecipes((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return {
    recipes,
    loading,
    error,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    refresh: fetchRecipes,
  }
}
