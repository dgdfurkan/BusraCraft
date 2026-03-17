import Modal from '../ui/Modal'
import Icon from '../ui/Icon'
import { motion } from 'framer-motion'
import { useToast } from '../../context/ToastContext'

export default function AddToListModal({ isOpen, onClose, lists, recipeId, onAdd }) {
  const { addToast } = useToast()

  const handleAdd = async (listId) => {
    try {
      await onAdd(listId, recipeId)
      addToast('Listeye eklendi!', 'success')
      onClose()
    } catch {
      addToast('Eklenirken hata oluştu', 'error')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Listeye Ekle" size="sm">
      {lists.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <Icon name="folder_off" size="text-4xl" className="text-text-secondary/40 mb-3" />
          <p className="text-sm text-text-secondary">
            Henüz liste oluşturulmamış.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {lists.map((list) => {
            const alreadyIn = (list.recipeIds || []).includes(recipeId)
            return (
              <motion.button
                key={list.id}
                whileHover={!alreadyIn ? { x: 4 } : undefined}
                onClick={() => !alreadyIn && handleAdd(list.id)}
                disabled={alreadyIn}
                className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200 ${
                  alreadyIn
                    ? 'bg-primary/5 opacity-60 cursor-not-allowed'
                    : 'hover:bg-primary/5 cursor-pointer'
                }`}
              >
                <span className="text-2xl shrink-0">{list.emoji || '📁'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text truncate">{list.name}</p>
                  <p className="text-xs text-text-secondary">
                    {(list.recipeIds || []).length} tarif
                  </p>
                </div>
                {alreadyIn && (
                  <div className="flex items-center gap-1 text-success shrink-0">
                    <Icon name="check_circle" size="text-lg" fill />
                    <span className="text-xs font-medium">Ekli</span>
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>
      )}
    </Modal>
  )
}
