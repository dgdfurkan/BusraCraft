import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import ListDetail from '../components/lists/ListDetail'
import ListForm from '../components/lists/ListForm'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import { useToast } from '../context/ToastContext'

export default function ListDetailPage({ getList, updateList, deleteList, removeRecipeFromList, recipes }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await getList(id)
      setList(data)
      setLoading(false)
    }
    load()
  }, [id, getList])

  const handleUpdate = async (data) => {
    await updateList(id, data)
    const updated = await getList(id)
    setList(updated)
    addToast('Liste güncellendi', 'success')
  }

  const handleDelete = async () => {
    await deleteList(id)
    addToast('Liste silindi', 'success')
    navigate('/listeler')
  }

  const handleRemoveRecipe = async (listId, recipeId) => {
    await removeRecipeFromList(listId, recipeId)
    const updated = await getList(id)
    setList(updated)
    addToast('Tarif listeden çıkarıldı', 'info')
  }

  if (loading) return <YarnBallSpinner />
  if (!list) return <div className="text-center py-12 text-text-secondary">Liste bulunamadı</div>

  return (
    <PageTransition>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            size="sm"
            icon="edit"
            onClick={() => setShowEdit(true)}
          >
            Düzenle
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon="delete"
            onClick={() => setShowDelete(true)}
          >
            Sil
          </Button>
        </div>

        <ListDetail
          list={list}
          recipes={recipes}
          onRemoveRecipe={handleRemoveRecipe}
        />

        <ListForm
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          onSubmit={handleUpdate}
          editData={list}
        />

        <ConfirmDialog
          isOpen={showDelete}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          title="Listeyi Sil"
          message={`"${list.name}" listesini silmek istediğinize emin misiniz?`}
        />
      </div>
    </PageTransition>
  )
}
