import Icon from '../ui/Icon'

export default function CategoryBadge({ category, size = 'sm' }) {
  if (!category) return null

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
  }

  return (
    <span className={`inline-flex items-center rounded-full bg-primary/20 text-primary font-semibold ${sizeClasses[size]}`}>
      <Icon name="local_offer" size="text-sm" />
      {category.emoji} {category.name}
    </span>
  )
}
