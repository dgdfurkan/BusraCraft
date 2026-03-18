import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCollections } from '../hooks/useCollections'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import EmptyState from '../components/ui/EmptyState'
import Icon from '../components/ui/Icon'

export default function CollectionsPage() {
  const { user } = useAuth()
  const { collections, loading, remove } = useCollections(user?.uid)
  const navigate = useNavigate()

  if (loading) return <YarnBallSpinner text="Koleksiyonlar yükleniyor..." />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">Koleksiyonlarım</h1>
        <p className="text-sm text-slate-500 mt-0.5">Kaydettiğin tarifler</p>
      </div>

      {collections.length === 0 ? (
        <EmptyState
          title="Koleksiyon yok"
          description="Keşfet sayfasından tarifleri kaydettiğinde burada görünecekler."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative bg-white rounded-xl border border-primary/10 p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
              onClick={() => navigate(`/koleksiyon/${col.id}`)}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{col.emoji || '📌'}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{col.name}</h3>
                </div>
                <Icon name="chevron_right" size="text-xl" className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>

              {col.name !== 'Favoriler' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Bu koleksiyonu silmek istediğine emin misin?')) remove(col.id)
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-50 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all cursor-pointer"
                >
                  <Icon name="delete" size="text-sm" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
