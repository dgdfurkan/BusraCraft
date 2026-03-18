import { useCallback } from 'react'
import { createSocialPost, deleteSocialPostByRecipe } from '../utils/socialHelpers'
import { useAuth } from '../context/AuthContext'

export function useRecipePublisher() {
  const { userProfile } = useAuth()

  const publishRecipe = useCallback(async (recipe) => {
    if (!userProfile) throw new Error('Kullanıcı profili bulunamadı.')
    return createSocialPost(recipe, userProfile)
  }, [userProfile])

  const unpublishRecipe = useCallback(async (recipeId) => {
    return deleteSocialPostByRecipe(recipeId)
  }, [])

  return { publishRecipe, unpublishRecipe }
}
