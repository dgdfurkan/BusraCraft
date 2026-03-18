import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getCollection,
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from '../utils/firebaseHelpers'
import { useAuth } from '../context/AuthContext'
import { createSocialPost, deleteSocialPostByRecipe } from '../utils/socialHelpers'

export function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, userProfile } = useAuth()

  const myRecipes = useMemo(
    () => (user ? recipes.filter((r) => r.ownerUid === user.uid) : []),
    [recipes, user]
  )

  const fetchRecipes = useCallback(async (fromServer = false) => {
    try {
      setLoading(true)
      const data = await getCollection('recipes', 'createdAt', 'desc', fromServer)
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
    const recipeData = { ...data }
    if (user) recipeData.ownerUid = user.uid

    const id = await addDocument('recipes', recipeData)

    if (recipeData.isPublic && userProfile) {
      try {
        await createSocialPost({ id, ...recipeData }, userProfile)
      } catch { /* non-critical */ }
    }

    await fetchRecipes(true)
    return id
  }, [fetchRecipes, user, userProfile])

  const updateRecipe = useCallback(async (id, data) => {
    await updateDocument('recipes', id, data)

    if (data.isPublic === true && userProfile) {
      try {
        await deleteSocialPostByRecipe(id)
        const fullRecipe = await getDocument('recipes', id)
        await createSocialPost({ id, ...fullRecipe }, userProfile)
      } catch { /* non-critical */ }
    } else if (data.isPublic === false) {
      try {
        await deleteSocialPostByRecipe(id)
      } catch { /* non-critical */ }
    }

    await fetchRecipes(true)
  }, [fetchRecipes, userProfile])

  const deleteRecipe = useCallback(async (id) => {
    try { await deleteSocialPostByRecipe(id) } catch { /* non-critical */ }
    await deleteDocument('recipes', id)
    setRecipes((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return {
    recipes,
    myRecipes,
    loading,
    error,
    getRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    refresh: fetchRecipes,
  }
}
