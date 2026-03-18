import { NavLink, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import { useAuth } from '../../context/AuthContext'

const publicItems = [
  { to: '/', icon: 'dashboard', label: 'Panel' },
  { to: '/kesfet', icon: 'explore', label: 'Keşfet' },
  { to: '/arama', icon: 'search', label: 'Arama' },
]

const memberItems = [
  { to: '/', icon: 'dashboard', label: 'Panel' },
  { to: '/tarifler', icon: 'menu_book', label: 'Tariflerim' },
  { to: '/kesfet', icon: 'explore', label: 'Keşfet' },
  { to: '/kategoriler', icon: 'category', label: 'Kategoriler' },
  { to: '/listeler', icon: 'check_circle', label: 'Listelerim' },
  { to: '/koleksiyonlarim', icon: 'collections_bookmark', label: 'Koleksiyonlarım' },
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
  const { isAuthenticated, isMember, userProfile, logout } = useAuth()

  const navItems = isMember ? memberItems : publicItems

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen fixed left-0 top-0 z-30 border-r border-primary/10 bg-white/50 backdrop-blur-sm">
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          <Logo size={42} />
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

        {isAuthenticated ? (
          <>
            {isMember && (
              <button
                onClick={() => navigate('/tarif-ekle')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <Icon name="add" size="text-lg" className="text-white" />
                Yeni Tarif
              </button>
            )}
            <div className="flex items-center gap-3 px-4 py-2">
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                  {(userProfile?.displayName || '?')[0].toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-slate-700 truncate flex-1">
                {userProfile?.displayName || 'Kullanıcı'}
              </span>
              <button
                onClick={logout}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer"
                title="Çıkış Yap"
              >
                <Icon name="logout" size="text-base" />
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate('/giris')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Icon name="login" size="text-lg" className="text-white" />
            Giriş Yap
          </button>
        )}
      </div>
    </aside>
  )
}
