import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import ConfirmDialog from '../ui/ConfirmDialog'

export default function RecipeActions({ recipe, onDelete, onAddToList }) {
  const navigate = useNavigate()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="sm"
            icon="edit"
            onClick={() => navigate(`/tarif-duzenle/${recipe.id}`)}
          >
            Düzenle
          </Button>
          {onAddToList && (
            <Button
              variant="secondary"
              size="sm"
              icon="playlist_add"
              onClick={onAddToList}
            >
              Listeye Ekle
            </Button>
          )}
          <Button
            variant="danger"
            size="sm"
            icon="delete"
            onClick={() => setShowDeleteDialog(true)}
          >
            Sil
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          onDelete(recipe.id)
          navigate('/tarifler')
        }}
        title="Tarifi Sil"
        message={`"${recipe.title}" tarifini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`}
      />
    </>
  )
}
