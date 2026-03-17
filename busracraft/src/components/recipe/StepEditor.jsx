import { useRef, useCallback } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import Icon from '../ui/Icon'

let stepIdCounter = Date.now()
function nextId() { return ++stepIdCounter }

function ensureIds(steps) {
  return steps.map((s) => s._id ? s : { ...s, _id: nextId() })
}

export default function StepEditor({ steps: rawSteps = [], onChange }) {
  const steps = ensureIds(rawSteps)
  const stepsRef = useRef(steps)
  stepsRef.current = steps

  const emit = useCallback((updated) => {
    onChange(updated.map((s, i) => ({ ...s, order: i + 1 })))
  }, [onChange])

  const addStep = () => {
    emit([...steps, { _id: nextId(), order: steps.length + 1, text: '', imageUrl: '' }])
  }

  const removeStep = (index) => {
    emit(steps.filter((_, i) => i !== index))
  }

  const updateStep = (index, value) => {
    emit(steps.map((s, i) => i === index ? { ...s, text: value } : s))
  }

  const moveStep = (index, direction) => {
    const target = index + direction
    if (target < 0 || target >= steps.length) return
    const updated = [...steps]
    ;[updated[index], updated[target]] = [updated[target], updated[index]]
    emit(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
          <Icon name="format_list_numbered" size="text-lg" className="text-primary" />
          Adımlar
        </label>
        <button
          type="button"
          onClick={addStep}
          className="flex items-center gap-1 text-primary text-xs font-semibold hover:text-primary/80 transition-colors cursor-pointer"
        >
          <Icon name="add_circle" size="text-base" />
          Adım Ekle
        </button>
      </div>

      <LayoutGroup>
        <AnimatePresence initial={false}>
          {steps.map((step, i) => (
            <motion.div
              key={step._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
              className="flex items-center gap-2 group"
            >
              {/* Order badge */}
              <motion.span
                layout
                className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0"
              >
                {i + 1}
              </motion.span>

              {/* Text input */}
              <textarea
                value={step.text}
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`${i + 1}. adımı yazın...`}
                rows={1}
                className="flex-1 px-3 py-2 rounded-lg border border-primary/10 bg-white/80 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm resize-none leading-relaxed"
                onInput={(e) => {
                  e.target.style.height = 'auto'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }}
              />

              {/* Actions — visible on hover */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                <button
                  type="button"
                  onClick={() => moveStep(i, -1)}
                  disabled={i === 0}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <Icon name="keyboard_arrow_up" size="text-base" />
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(i, 1)}
                  disabled={i === steps.length - 1}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <Icon name="keyboard_arrow_down" size="text-base" />
                </button>
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                >
                  <Icon name="close" size="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </LayoutGroup>

      {steps.length === 0 && (
        <div className="text-center py-6 text-slate-400">
          <Icon name="playlist_add" size="text-3xl" className="mb-1.5 opacity-40" />
          <p className="text-xs">Henüz adım yok. &quot;Adım Ekle&quot;ye tıklayın.</p>
        </div>
      )}
    </div>
  )
}
