import { motion } from 'framer-motion'
import { themes } from '../../styles/themes'
import { useTheme } from '../../context/ThemeContext'
import Icon from '../ui/Icon'

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((t) => {
        const isSelected = theme === t.id
        return (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setTheme(t.id)}
            className={`relative bg-white rounded-2xl border-2 p-5 shadow-sm text-center transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'border-primary shadow-md shadow-primary/10'
                : 'border-primary/10 hover:border-primary/30'
            }`}
            style={{ backgroundColor: t.bg }}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2"
              >
                <Icon name="check_circle" size="text-lg" className="text-primary" fill />
              </motion.div>
            )}
            <span className="text-2xl block mb-2">{t.emoji}</span>
            <p className="text-xs font-semibold" style={{ color: t.primary }}>
              {t.name}
            </p>
            <div
              className="w-7 h-7 rounded-full mx-auto mt-3 ring-2 ring-white shadow-sm"
              style={{ backgroundColor: t.primary }}
            />
          </motion.button>
        )
      })}
    </div>
  )
}
