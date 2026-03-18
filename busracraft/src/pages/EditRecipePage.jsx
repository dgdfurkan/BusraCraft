import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import RecipeForm from '../components/recipe/RecipeForm'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function EditRecipePage({ categories, getRecipe, updateRecipe, uploadImages }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToast } = useToast()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await getRecipe(id)
      setRecipe(data)
      setLoading(false)
    }
    load()
  }, [id, getRecipe])

  useEffect(() => {
    if (!loading && recipe && user && recipe.ownerUid !== user.uid) {
      addToast('Bu tarifi düzenleme yetkiniz yok', 'error')
      navigate(`/tarif/${id}`)
    }
  }, [loading, recipe, user, id, navigate, addToast])

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      let photoUrls = formData.photos || []
      if (formData.newPhotos?.length > 0) {
        const uploaded = await uploadImages(formData.newPhotos)
        photoUrls = [...photoUrls, ...uploaded.map((u) => u.url)]
      }

      const { newPhotos, ...rest } = formData
      await updateRecipe(id, { ...rest, photos: photoUrls })
      addToast('Tarif güncellendi!', 'success')
      navigate(`/tarif/${id}`)
    } catch {
      addToast('Güncelleme sırasında hata oluştu', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <YarnBallSpinner />
  if (!recipe) return <div className="text-center py-12 text-text-secondary">Tarif bulunamadı</div>
  if (user && recipe.ownerUid !== user.uid) return null

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto">
        <RecipeForm
          initialData={recipe}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          loading={saving}
          submitLabel="Güncelle"
        />
      </div>
    </PageTransition>
  )
}
