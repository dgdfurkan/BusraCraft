import { motion } from 'framer-motion'
import Icon from '../ui/Icon'

export default function CategoryGrid({ categories, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="bg-white rounded-2xl p-5 border border-primary/10 shadow-sm text-center group relative hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
        >
          <motion.span
            className="text-3xl block mb-2"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          >
            {cat.emoji}
          </motion.span>
          <p className="text-sm font-semibold text-text truncate">{cat.name}</p>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
            {onEdit && !cat.isDefault && (
              <button
                onClick={() => onEdit(cat)}
                className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <Icon name="edit" size="text-sm" />
              </button>
            )}
            {onDelete && !cat.isDefault && (
              <button
                onClick={() => onDelete(cat.id)}
                className="w-7 h-7 rounded-full bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer"
              >
                <Icon name="delete" size="text-sm" />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
