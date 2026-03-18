import Icon from '../ui/Icon'
import Dropdown from '../ui/Dropdown'
import { DEFAULT_CATEGORIES } from '../../utils/constants'

export default function SocialFilterBar({ filters, members = [], onFilterChange, onReset }) {
  const categoryOptions = [
    { value: '', label: 'Tüm Kategoriler' },
    ...DEFAULT_CATEGORIES.map((cat) => ({
      value: cat.id,
      label: `${cat.emoji} ${cat.name}`,
    })),
  ]

  const memberOptions = [
    { value: '', label: 'Tüm Üyeler' },
    ...members.map((m) => ({
      value: m.uid,
      label: m.displayName || 'Anonim',
    })),
  ]

  const hasActiveFilter = filters.category || filters.ownerUid

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="w-44">
        <Dropdown
          value={filters.category}
          onChange={(val) => onFilterChange('category', val)}
          options={categoryOptions}
          placeholder="Kategori"
        />
      </div>

      {members.length > 0 && (
        <div className="w-44">
          <Dropdown
            value={filters.ownerUid}
            onChange={(val) => onFilterChange('ownerUid', val)}
            options={memberOptions}
            placeholder="Paylaşan"
          />
        </div>
      )}

      {hasActiveFilter && (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
        >
          <Icon name="filter_list_off" size="text-base" />
          Temizle
        </button>
      )}
    </div>
  )
}
