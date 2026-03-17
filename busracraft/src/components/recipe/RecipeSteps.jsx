import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'

export default function RecipeSteps({ steps = [] }) {
  const [checked, setChecked] = useState({})

  if (steps.length === 0) return null

  const toggle = (index) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const stepNumber = step.order || i + 1
        const isDone = checked[i]

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-white'
                }`}
              >
                {isDone ? (
                  <Icon name="check" size="text-base" />
                ) : (
                  stepNumber
                )}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-primary/20 my-1" />
              )}
            </div>

            <div className={`flex-1 pb-4 ${!isLast ? 'border-b border-primary/5' : ''}`}>
              <div className="flex items-start gap-3">
                <p
                  className={`text-sm leading-relaxed flex-1 transition-colors ${
                    isDone ? 'text-slate-400 line-through' : 'text-slate-600'
                  }`}
                >
                  {step.text}
                </p>
                <input
                  type="checkbox"
                  checked={isDone || false}
                  onChange={() => toggle(i)}
                  className="rounded text-primary focus:ring-primary h-5 w-5 cursor-pointer shrink-0 mt-0.5"
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
