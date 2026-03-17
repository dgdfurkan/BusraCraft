import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'

export default function Dropdown({ value, onChange, options = [], placeholder = 'Seçin...', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-primary/10 bg-white text-sm transition-all hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
      >
        <span className={selected ? 'text-slate-900' : 'text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="expand_more"
          size="text-lg"
          className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-primary/10 shadow-xl shadow-black/10 overflow-hidden max-h-60 overflow-y-auto"
          >
            {placeholder && (
              <button
                type="button"
                onClick={() => { onChange(''); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  !value ? 'bg-primary/5 text-primary font-semibold' : 'text-slate-400 hover:bg-primary/5'
                }`}
              >
                {placeholder}
              </button>
            )}
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer flex items-center gap-2 ${
                  value === opt.value
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-slate-700 hover:bg-primary/5'
                }`}
              >
                {opt.icon && <span className="text-base">{opt.icon}</span>}
                <span>{opt.label}</span>
                {value === opt.value && (
                  <Icon name="check" size="text-sm" className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
