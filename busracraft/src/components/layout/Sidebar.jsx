import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'

const navItems = [
  { to: '/', icon: 'dashboard', label: 'Panel' },
  { to: '/tarifler', icon: 'menu_book', label: 'Tariflerim' },
  { to: '/kategoriler', icon: 'category', label: 'Kategoriler' },
  { to: '/listeler', icon: 'check_circle', label: 'Listelerim' },
  { to: '/arama', icon: 'search', label: 'Arama' },
]

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
    isActive
      ? 'bg-primary/10 text-primary font-semibold'
      : 'text-slate-600 hover:bg-primary/5 hover:text-slate-800 font-medium'
  }`

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 z-30 border-r border-primary/10 bg-white/50 backdrop-blur-sm">
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Icon name="self_improvement" size="text-xl" className="text-white" fill />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight leading-none">
              BüşraCraft
            </h1>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Örgü Dünyası</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
            {({ isActive }) => (
              <>
                <Icon name={item.icon} size="text-xl" fill={isActive} className="shrink-0" />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 pb-4 space-y-3">
        <NavLink to="/ayarlar" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Icon name="settings" size="text-xl" fill={isActive} className="shrink-0" />
              Ayarlar
            </>
          )}
        </NavLink>

        <button
          onClick={() => navigate('/tarif-ekle')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
        >
          <Icon name="add" size="text-lg" className="text-white" />
          Yeni Tarif
        </button>
      </div>
    </aside>
  )
}
