import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../../context/ToastContext'
import Icon from './Icon'

const typeConfig = {
  success: { bg: 'bg-success', icon: 'check_circle' },
  error: { bg: 'bg-error', icon: 'error' },
  warning: { bg: 'bg-warning', icon: 'warning' },
  info: { bg: 'bg-blue-500', icon: 'info' },
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = typeConfig[toast.type] || typeConfig.success
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className={`${config.bg} text-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 cursor-pointer`}
              onClick={() => removeToast(toast.id)}
            >
              <Icon name={config.icon} size="text-xl" fill />
              <span className="text-sm font-semibold leading-snug">{toast.message}</span>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
