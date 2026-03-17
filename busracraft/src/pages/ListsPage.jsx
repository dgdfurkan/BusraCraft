import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import ListGrid from '../components/lists/ListGrid'
import ListForm from '../components/lists/ListForm'
import Button from '../components/ui/Button'
import { useToast } from '../context/ToastContext'

export default function ListsPage({ lists, addList, updateList, deleteList }) {
  const { addToast } = useToast()
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (data) => {
    try {
      await addList(data)
      addToast('Liste oluşturuldu!', 'success')
    } catch {
      addToast('Liste oluşturulamadı', 'error')
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button
            icon="add_circle"
            onClick={() => setShowForm(true)}
          >
            Yeni Liste
          </Button>
        </div>

        <ListGrid lists={lists} onCreateNew={() => setShowForm(true)} />

        <ListForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </PageTransition>
  )
}
