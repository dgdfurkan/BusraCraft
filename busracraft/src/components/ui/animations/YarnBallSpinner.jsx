import { motion } from 'framer-motion'
import KnittingAnimation from './KnittingAnimation'

export default function YarnBallSpinner({ size = 200, text = 'Yükleniyor...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: size }}
      >
        <KnittingAnimation className="w-full h-auto" />
      </motion.div>
      {text && (
        <p className="text-sm text-text-secondary animate-pulse-soft">
          {text}
        </p>
      )}
    </div>
  )
}
