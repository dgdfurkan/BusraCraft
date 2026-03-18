import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import { useAuth } from '../../context/AuthContext'

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all duration-200 ${
          isActive ? 'text-primary font-semibold' : 'text-slate-400'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon name={icon} size="text-[22px]" fill={isActive} />
          <span className="text-[10px] leading-tight">{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function BottomNav() {
  const navigate = useNavigate()
  const { isAuthenticated, isMember } = useAuth()

  const leftItems = [
    { to: '/', icon: 'dashboard', label: 'Ana' },
    { to: '/kesfet', icon: 'explore', label: 'Keşfet' },
  ]

  const rightItems = isMember
    ? [
        { to: '/tarifler', icon: 'menu_book', label: 'Tarif' },
        { to: '/ayarlar', icon: 'settings', label: 'Ayar' },
      ]
    : [
        { to: '/arama', icon: 'search', label: 'Ara' },
        { to: isAuthenticated ? '/ayarlar' : '/giris', icon: isAuthenticated ? 'settings' : 'login', label: isAuthenticated ? 'Ayar' : 'Giriş' },
      ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-primary/10 pb-[env(safe-area-inset-bottom)]" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div className="flex items-center h-16 max-w-lg mx-auto relative">
        {leftItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        {isMember && (
          <div className="flex-1 flex items-center justify-center">
            <button
              onClick={() => navigate('/tarif-ekle')}
              className="absolute -top-5 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Icon name="content_cut" size="text-2xl" className="text-white" />
            </button>
          </div>
        )}

        {rightItems.map((item) => (
          <NavItem key={item.to + item.label} {...item} />
        ))}
      </div>
    </nav>
  )
}
