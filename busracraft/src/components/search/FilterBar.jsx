import Icon from '../ui/Icon'
import Dropdown from '../ui/Dropdown'
import { DIFFICULTIES, SORT_OPTIONS } from '../../utils/constants'

const difficultyButtonStyles = {
  easy: {
    active: 'bg-green-500 text-white shadow-sm shadow-green-500/20',
    inactive: 'text-primary bg-primary/5 hover:bg-green-500 hover:text-white',
  },
  medium: {
    active: 'bg-amber-500 text-white shadow-sm shadow-amber-500/20',
    inactive: 'text-primary bg-primary/5 hover:bg-amber-500 hover:text-white',
  },
  hard: {
    active: 'bg-red-500 text-white shadow-sm shadow-red-500/20',
    inactive: 'text-primary bg-primary/5 hover:bg-red-500 hover:text-white',
  },
}

export default function FilterBar({ categories, filters, onFilterChange, onClear, hasActive }) {
  const sortOptions = SORT_OPTIONS.map((o) => ({ value: o.id, label: o.label }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('category', null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
            !filters.category
              ? 'bg-primary text-white shadow-md shadow-primary/20'
              : 'bg-white border border-primary/20 text-slate-600 hover:bg-primary/5'
          }`}
        >
          <Icon name="grid_view" size="text-base" />
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onFilterChange('category', filters.category === (cat.id || cat.name) ? null : (cat.id || cat.name))}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
              filters.category === (cat.id || cat.name)
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-white border border-primary/20 text-slate-600 hover:bg-primary/5'
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white/50 p-3 rounded-2xl border border-primary/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-500 ml-2">Zorluk:</span>
          <div className="flex gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                onClick={() => onFilterChange('difficulty', filters.difficulty === d.id ? null : d.id)}
                className={`px-4 py-1.5 rounded-lg border border-primary/30 text-xs font-bold transition-all cursor-pointer ${
                  filters.difficulty === d.id
                    ? difficultyButtonStyles[d.id].active
                    : difficultyButtonStyles[d.id].inactive
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Dropdown
            value={filters.sortBy || 'newest'}
            onChange={(val) => onFilterChange('sortBy', val)}
            options={sortOptions}
            placeholder=""
            className="w-36"
          />

          {hasActive && (
            <button
              onClick={onClear}
              className="text-primary font-bold text-sm hover:underline cursor-pointer whitespace-nowrap"
            >
              Temizle
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
