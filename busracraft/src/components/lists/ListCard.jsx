import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'

export default function ListCard({ list, index = 0 }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/liste/${list.id}`)}
      className="bg-white rounded-2xl p-5 border border-primary/10 shadow-sm cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
      style={{ borderLeftWidth: 4, borderLeftColor: list.color || 'var(--color-primary)' }}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl shrink-0">{list.emoji || '📁'}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text truncate">{list.name}</h3>
          {list.description && (
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
              {list.description}
            </p>
          )}
          <div className="flex items-center gap-1 mt-2 text-text-secondary">
            <Icon name="menu_book" size="text-sm" />
            <span className="text-xs font-medium">
              {(list.recipeIds || []).length} tarif
            </span>
          </div>
        </div>
        <div className="text-primary/40 group-hover:text-primary transition-colors shrink-0">
          <Icon name="arrow_forward" size="text-lg" />
        </div>
      </div>
    </motion.div>
  )
}
