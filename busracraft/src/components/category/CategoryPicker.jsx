import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Dropdown from '../ui/Dropdown'
import Icon from '../ui/Icon'

export default function CategoryPicker({ categories, value, onChange, onAddNew }) {
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('🧶')

  const handleAdd = () => {
    if (newName.trim()) {
      onAddNew({ name: newName.trim(), emoji: newEmoji })
      setNewName('')
      setNewEmoji('🧶')
      setShowNew(false)
    }
  }

  const options = categories.map((cat) => ({
    value: cat.id || cat.name,
    label: `${cat.emoji} ${cat.name}`,
    icon: cat.emoji,
  }))

  return (
    <div>
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        placeholder="Kategori Seçin..."
      />

      <button
        type="button"
        onClick={() => setShowNew(true)}
        className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:text-primary-hover transition-colors cursor-pointer"
      >
        <Icon name="add_circle" size="text-sm" />
        Yeni kategori ekle
      </button>

      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Yeni Kategori" size="sm">
        <div className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newEmoji}
              onChange={(e) => setNewEmoji(e.target.value)}
              className="w-16 px-3 py-2.5 rounded-xl border border-primary/10 bg-white text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              maxLength={2}
            />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Kategori adı"
              className="flex-1 px-4 py-2.5 rounded-xl border border-primary/10 bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
          <Button onClick={handleAdd} className="w-full">Ekle</Button>
        </div>
      </Modal>
    </div>
  )
}
