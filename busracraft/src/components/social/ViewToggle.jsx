import Icon from '../ui/Icon'

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex bg-white border border-primary/10 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => onChange('feed')}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all cursor-pointer ${
          view === 'feed'
            ? 'bg-primary text-white'
            : 'text-slate-500 hover:bg-primary/5'
        }`}
      >
        <Icon name="view_agenda" size="text-base" fill={view === 'feed'} />
        <span className="hidden sm:inline">Akış</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('grid')}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium transition-all cursor-pointer ${
          view === 'grid'
            ? 'bg-primary text-white'
            : 'text-slate-500 hover:bg-primary/5'
        }`}
      >
        <Icon name="grid_view" size="text-base" fill={view === 'grid'} />
        <span className="hidden sm:inline">Grid</span>
      </button>
    </div>
  )
}
