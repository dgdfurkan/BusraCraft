import { motion } from 'framer-motion'
import Button from './Button'
import CatChaseAnimation from './animations/CatChaseAnimation'

export default function EmptyState({
  title = 'Henüz bir şey yok',
  description = '',
  actionLabel,
  onAction,
  actionIcon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-56 mb-4"
      >
        <CatChaseAnimation className="w-full h-auto" />
      </motion.div>
      <h3 className="text-xl font-bold text-text mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm mb-8 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction} icon={actionIcon}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
