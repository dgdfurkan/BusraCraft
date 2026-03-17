import { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const COLORS = ['#F472B6', '#A78BFA', '#34D399', '#F59E0B', '#38BDF8', '#FB7185']
const EMOJIS = ['📁', '🎁', '❤️', '⭐', '🌸', '🎀', '🧸', '🌈', '💝', '🪡']

export default function ListForm({ isOpen, onClose, onSubmit, editData = null }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [emoji, setEmoji] = useState('📁')
  const [color, setColor] = useState(COLORS[0])

  useEffect(() => {
    if (editData) {
      setName(editData.name || '')
      setDescription(editData.description || '')
      setEmoji(editData.emoji || '📁')
      setColor(editData.color || COLORS[0])
    } else {
      setName('')
      setDescription('')
      setEmoji('📁')
      setColor(COLORS[0])
    }
  }, [editData, isOpen])

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit({ name: name.trim(), description: description.trim(), emoji, color })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editData ? 'Liste Düzenle' : 'Yeni Liste'}
      size="sm"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="playlist_add" className="text-primary" />
          </div>
          <p className="text-sm text-text-secondary">
            {editData ? 'Liste bilgilerini güncelleyin' : 'Tariflerinizi gruplamak için liste oluşturun'}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Liste Adı</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Hediye Fikirleri"
            className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-1.5 block">Açıklama</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Bu liste hakkında kısa bir açıklama..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-white text-text resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-2 block">Emoji</label>
          <div className="flex flex-wrap gap-2">
            {EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEmoji(e)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-200 cursor-pointer ${
                  emoji === e
                    ? 'bg-primary/10 ring-2 ring-primary shadow-sm'
                    : 'bg-white border border-primary/10 hover:bg-primary/5'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text mb-2 block">Renk</label>
          <div className="flex gap-3">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer ${
                  color === c ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="secondary" onClick={onClose}>İptal</Button>
          <Button onClick={handleSubmit}>{editData ? 'Güncelle' : 'Oluştur'}</Button>
        </div>
      </div>
    </Modal>
  )
}
