import Header from './Header'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'
import ToastContainer from '../ui/Toast'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="px-4 py-4 pb-24 lg:px-8 lg:pb-12">
          {children}
        </main>
      </div>
      <BottomNav />
      <ToastContainer />
    </div>
  )
}
