import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function CategoryForm({ isOpen, onClose, onSubmit, editData = null }) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🧶')

  useEffect(() => {
    if (editData) {
      setName(editData.name || '')
      setEmoji(editData.emoji || '🧶')
    } else {
      setName('')
      setEmoji('🧶')
    }
  }, [editData, isOpen])

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit({ name: name.trim(), emoji })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? 'Kategori Düzenle' : 'Yeni Kategori'}
      size="sm"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="category" className="text-primary" />
          </div>
          <p className="text-sm text-text-secondary">
            {editData ? 'Kategori bilgilerini güncelleyin' : 'Yeni bir kategori oluşturun'}
          </p>
        </div>

        <div className="flex gap-3">
          <div>
            <label className="text-sm font-medium text-text mb-1.5 block">Emoji</label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-16 px-3 py-2.5 rounded-xl border border-primary/10 bg-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              maxLength={2}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-text mb-1.5 block">Kategori Adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Amigurumi"
              className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-1">
          <Button variant="secondary" onClick={onClose}>İptal</Button>
          <Button onClick={handleSubmit}>{editData ? 'Güncelle' : 'Ekle'}</Button>
        </div>
      </div>
    </Modal>
  )
}
