import Icon from '../ui/Icon'

export default function TagChip({ label, active = false, onClick, removable = false, onRemove }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
        active
          ? 'bg-primary text-white shadow-md shadow-primary/20'
          : 'bg-white border border-primary/20 text-slate-600 hover:bg-primary/5'
      }`}
    >
      {label}
      {removable && onRemove && (
        <span
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 hover:text-red-300 transition-colors"
        >
          <Icon name="close" size="text-sm" />
        </span>
      )}
    </button>
  )
}
