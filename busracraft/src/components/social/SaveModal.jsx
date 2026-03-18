import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from '../ui/Modal'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

const EMOJI_PRESETS = ['📌', '❤️', '🧶', '⭐', '🎀', '🌸', '🧸', '💎', '🪡', '✨']

export default function SaveModal({ isOpen, onClose, collections = [], onSave, onCreateCollection, loading }) {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('📌')

  const handleCreate = async () => {
    if (!newName.trim()) return
    await onCreateCollection(newName.trim(), newEmoji)
    setCreating(false)
    setNewName('')
    setNewEmoji('📌')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Koleksiyona Kaydet">
      <div className="space-y-3">
        <AnimatePresence>
          {collections.map((col) => (
            <motion.button
              key={col.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              type="button"
              onClick={() => onSave(col.id)}
              disabled={loading}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/10 bg-white hover:bg-primary/5 hover:border-primary/20 transition-all cursor-pointer text-left disabled:opacity-50"
            >
              <span className="text-xl">{col.emoji || '📌'}</span>
              <span className="flex-1 font-semibold text-slate-800 text-sm">{col.name}</span>
              <Icon name="add_circle" size="text-xl" className="text-primary/40" />
            </motion.button>
          ))}
        </AnimatePresence>

        {creating ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-primary/5 rounded-xl p-4 space-y-3"
          >
            <div className="flex gap-2 flex-wrap">
              {EMOJI_PRESETS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setNewEmoji(e)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg cursor-pointer transition-all ${
                    newEmoji === e ? 'bg-primary/20 ring-2 ring-primary/40' : 'hover:bg-white'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Koleksiyon adı..."
              maxLength={30}
              className="w-full px-3 py-2.5 rounded-xl border border-primary/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate} disabled={!newName.trim()}>
                <Icon name="check" size="text-sm" />
                Oluştur
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setCreating(false)}>
                İptal
              </Button>
            </div>
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-primary/20 text-primary font-semibold text-sm hover:bg-primary/5 transition-all cursor-pointer"
          >
            <Icon name="add" size="text-lg" />
            Yeni Koleksiyon Oluştur
          </button>
        )}
      </div>
    </Modal>
  )
}
