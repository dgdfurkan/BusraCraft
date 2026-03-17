import { motion } from 'framer-motion'
import Icon from '../ui/Icon'

export default function OcrButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 p-4 bg-white rounded-2xl border-2 border-dashed border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 cursor-pointer"
    >
      <Icon name="document_scanner" size="text-2xl" />
      <div className="text-left">
        <p className="font-semibold text-sm">Fotoğraftan Tarif Oku</p>
        <p className="text-xs opacity-70">AI ile otomatik tanıma</p>
      </div>
    </motion.button>
  )
}
