import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import CategoryGrid from '../components/category/CategoryGrid'
import CategoryForm from '../components/category/CategoryForm'
import Button from '../components/ui/Button'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import { useToast } from '../context/ToastContext'

export default function CategoriesPage({ categories, addCategory, updateCategory, deleteCategory }) {
  const { addToast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const handleSubmit = async (data) => {
    try {
      if (editData) {
        await updateCategory(editData.id, data)
        addToast('Kategori güncellendi', 'success')
      } else {
        await addCategory(data)
        addToast('Kategori eklendi', 'success')
      }
      setEditData(null)
    } catch {
      addToast('İşlem başarısız', 'error')
    }
  }

  const handleEdit = (cat) => {
    setEditData(cat)
    setShowForm(true)
  }

  const handleDelete = async () => {
    try {
      await deleteCategory(deleteId)
      addToast('Kategori silindi', 'success')
    } catch {
      addToast('Silme başarısız', 'error')
    }
    setDeleteId(null)
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            icon="add_circle"
            onClick={() => { setEditData(null); setShowForm(true) }}
          >
            Yeni Kategori
          </Button>
        </div>

        <CategoryGrid
          categories={categories}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteId(id)}
        />

        <CategoryForm
          isOpen={showForm}
          onClose={() => { setShowForm(false); setEditData(null) }}
          onSubmit={handleSubmit}
          editData={editData}
        />

        <ConfirmDialog
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          title="Kategori Sil"
          message="Bu kategoriyi silmek istediğinize emin misiniz?"
        />
      </div>
    </PageTransition>
  )
}
