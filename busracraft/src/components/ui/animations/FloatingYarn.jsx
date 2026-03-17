import { motion } from 'framer-motion'
import { useMemo } from 'react'

const yarnEmojis = ['🧶', '🪡', '🧵', '🎀', '💜', '🌸']

export default function FloatingYarn({ count = 6 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        emoji: yarnEmojis[i % yarnEmojis.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 5,
        size: 16 + Math.random() * 12,
      })),
    [count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute opacity-[0.04]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
