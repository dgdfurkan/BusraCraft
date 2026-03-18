import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import YarnBallSpinner from '../ui/animations/YarnBallSpinner'

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <YarnBallSpinner text="Yükleniyor..." />
  if (!isAuthenticated) return <Navigate to="/giris" state={{ from: location }} replace />
  return children
}

export function MemberOnlyRoute({ children }) {
  const { isAuthenticated, isMember, loading } = useAuth()
  const location = useLocation()

  if (loading) return <YarnBallSpinner text="Yükleniyor..." />
  if (!isAuthenticated) return <Navigate to="/giris" state={{ from: location }} replace />
  if (!isMember) return <AccessDenied />
  return children
}

export function GuestOnlyRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <YarnBallSpinner text="Yükleniyor..." />
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}

function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-primary">lock</span>
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Erişim Kısıtlı</h2>
      <p className="text-slate-500 max-w-sm mb-6">
        Bu sayfaya erişebilmek için üye olmanız gerekiyor. Yönetici tarafından üyelik onayı verildiğinde tüm özelliklere erişebilirsiniz.
      </p>
      <a
        href="#/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:brightness-110 transition-all"
      >
        <span className="material-symbols-outlined text-lg">home</span>
        Ana Sayfaya Dön
      </a>
    </div>
  )
}
