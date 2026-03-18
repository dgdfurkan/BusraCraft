import { motion, AnimatePresence } from 'framer-motion'
import Icon from '../ui/Icon'

export default function SaveButton({ saved, count = 0, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 group"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={saved ? 'saved' : 'not-saved'}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
        >
          <Icon
            name="bookmark"
            fill={saved}
            size="text-xl"
            className={saved ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}
          />
        </motion.span>
      </AnimatePresence>
      <span className={saved ? 'text-primary' : 'text-slate-500'}>
        {count > 0 ? count : ''}
      </span>
    </button>
  )
}
