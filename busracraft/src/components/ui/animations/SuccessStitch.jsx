import { motion } from 'framer-motion'

export default function SuccessStitch({ show = true }) {
  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="var(--color-success)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4 }}
        />
        <motion.path
          d="M20 32 L28 40 L44 24"
          fill="none"
          stroke="var(--color-success)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
      </motion.svg>
    </motion.div>
  )
}
