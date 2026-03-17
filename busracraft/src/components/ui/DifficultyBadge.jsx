import { DIFFICULTIES } from '../../utils/constants'

const colorMap = {
  easy: 'bg-green-500',
  medium: 'bg-amber-500',
  hard: 'bg-red-500',
}

export default function DifficultyBadge({ difficulty }) {
  const diff = DIFFICULTIES.find((d) => d.id === difficulty)
  if (!diff) return null

  return (
    <span
      className={`
        inline-block text-white text-[10px] font-bold uppercase tracking-wider
        rounded-full shadow-lg px-3 py-1
        ${colorMap[difficulty] || 'bg-slate-500'}
      `}
    >
      {diff.label}
    </span>
  )
}
