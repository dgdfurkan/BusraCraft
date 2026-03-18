import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import RecipeForm from '../components/recipe/RecipeForm'
import OcrModal from '../components/ocr/OcrModal'
import Button from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

export default function AddRecipePage({ categories, addRecipe, uploadImages }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [showOcr, setShowOcr] = useState(searchParams.get('ocr') === '1')
  const [ocrData, setOcrData] = useState(null)

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      let photoUrls = formData.photos || []
      if (formData.newPhotos?.length > 0) {
        const uploaded = await uploadImages(formData.newPhotos)
        photoUrls = [...photoUrls, ...uploaded.map((u) => u.url)]
      }

      const { newPhotos, ...rest } = formData
      await addRecipe({ ...rest, photos: photoUrls })
      addToast('Tarif başarıyla eklendi!', 'success')
      navigate('/tarifler')
    } catch (err) {
      const msg = err?.message || err?.toString?.() || 'Tarif eklenirken hata oluştu'
      console.log('[AddRecipe] HATA:', msg, err)
      addToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleOcrResult = (data) => {
    setOcrData(data)
    setShowOcr(false)
  }

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-5">
        <Button
          variant="secondary"
          icon="document_scanner"
          onClick={() => setShowOcr(true)}
          className="w-full"
        >
          Fotoğraftan Tarif Oku (AI)
        </Button>

        <RecipeForm
          initialData={ocrData ? {
            title: ocrData.title || '',
            steps: (ocrData.steps || []).map((s, i) => ({
              order: s.order || i + 1,
              text: s.text,
              imageUrl: '',
            })),
            notes: ocrData.notes || '',
          } : {}}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
          loading={loading}
          submitLabel="Tarifi Kaydet"
        />

        <OcrModal
          isOpen={showOcr}
          onClose={() => setShowOcr(false)}
          onResult={handleOcrResult}
        />
      </div>
    </PageTransition>
  )
}
