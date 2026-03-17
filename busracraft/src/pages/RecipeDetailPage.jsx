import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import RecipeDetail from '../components/recipe/RecipeDetail'
import RecipeActions from '../components/recipe/RecipeActions'
import AddToListModal from '../components/lists/AddToListModal'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import Icon from '../components/ui/Icon'

export default function RecipeDetailPage({ getRecipe, deleteRecipe, lists, addRecipeToList }) {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showListModal, setShowListModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const data = await getRecipe(id)
      setRecipe(data)
      setLoading(false)
    }
    load()
  }, [id, getRecipe])

  if (loading) return <YarnBallSpinner />

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-secondary">
        <Icon name="search_off" size="text-5xl" className="mb-3 text-slate-300" />
        <p className="text-lg font-semibold text-slate-500">Tarif bulunamadı</p>
        <p className="text-sm text-slate-400 mt-1">Bu tarif silinmiş veya mevcut değil.</p>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="space-y-6 max-w-5xl mx-auto">
        <RecipeDetail recipe={recipe} />
        <RecipeActions
          recipe={recipe}
          onDelete={deleteRecipe}
          onAddToList={() => setShowListModal(true)}
        />
        <AddToListModal
          isOpen={showListModal}
          onClose={() => setShowListModal(false)}
          lists={lists || []}
          recipeId={recipe.id}
          onAdd={addRecipeToList}
        />
      </div>
    </PageTransition>
  )
}
