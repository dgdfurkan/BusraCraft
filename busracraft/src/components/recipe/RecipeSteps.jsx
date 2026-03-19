import { motion } from 'framer-motion'

export default function RecipeSteps({ steps = [] }) {
  if (steps.length === 0) return null

  return (
    <div className="p-6 flex flex-col gap-6">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const stepNumber = step.order || i + 1

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-primary text-white">
                {stepNumber}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-primary/20 my-1" />
              )}
            </div>

            <div className={`flex-1 pb-4 ${!isLast ? 'border-b border-primary/5' : ''}`}>
              <p className="text-sm leading-relaxed text-slate-600">
                {step.text}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
