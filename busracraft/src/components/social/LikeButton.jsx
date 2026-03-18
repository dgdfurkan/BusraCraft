import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon'

export default function LikeButton({ liked, count = 0, onToggle, disabled }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className="flex items-center gap-1.5 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 group"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={liked ? 'liked' : 'not-liked'}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          <Icon
            name="favorite"
            fill={liked}
            size="text-xl"
            className={liked ? 'text-red-500' : 'text-slate-400 group-hover:text-red-400'}
          />
        </motion.span>
      </AnimatePresence>
      <span className={liked ? 'text-red-500' : 'text-slate-500'}>
        {count > 0 ? count : ''}
      </span>
    </button>
  )
}
