import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'

const pageTitles = {
  '/tarifler': 'Tariflerim',
  '/tarif-ekle': 'Yeni Tarif',
  '/listeler': 'Listelerim',
  '/kategoriler': 'Kategoriler',
  '/arama': 'Arama',
  '/ayarlar': 'Ayarlar',
}

function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname]
  if (pathname.startsWith('/tarif-duzenle')) return 'Tarif Düzenle'
  if (pathname.startsWith('/tarif/')) return 'Tarif Detay'
  if (pathname.startsWith('/liste/')) return 'Liste Detay'
  return null
}

export default function Header() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  const title = getPageTitle(pathname)

  return (
    <header className="sticky top-0 z-40 border-b border-primary/10" style={{ background: 'rgba(248,246,247,0.8)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-primary/5 text-slate-500 hover:text-primary transition-all duration-200 shrink-0"
            >
              <Icon name="arrow_back" size="text-xl" />
            </button>
          )}

          {isHome ? (
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-800 leading-tight">
                Hoş geldin Büşra! 🧶
              </h2>
              <p className="text-sm text-slate-500 hidden sm:block">
                Bugün ne örmek istersin?
              </p>
            </div>
          ) : (
            <h1 className="text-xl font-bold text-slate-800 tracking-tight truncate">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => navigate('/arama')}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all duration-200"
          >
            <Icon name="search" size="text-xl" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 transition-all duration-200">
            <Icon name="notifications" size="text-xl" />
          </button>
        </div>
      </div>
    </header>
  )
}
