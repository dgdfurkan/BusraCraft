import { useState, useEffect } from 'react'
import CatYarnAnimation from './animations/CatYarnAnimation'

export default function AppLoader({ loading, children }) {
  const [fontsReady, setFontsReady] = useState(false)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!document.fonts?.ready) {
      setFontsReady(true)
      return
    }
    document.fonts.ready.then(() => setFontsReady(true))
  }, [])

  const ready = !loading && fontsReady && minTimeElapsed

  useEffect(() => {
    if (ready) {
      setExiting(true)
    }
  }, [ready])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(() => setExiting(false), 450)
    return () => clearTimeout(t)
  }, [exiting])

  const showLoader = !ready || exiting

  return (
    <>
      {showLoader && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg transition-opacity duration-300 ${
            exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <div className="w-full max-w-[280px] px-4">
            <CatYarnAnimation className="w-full h-auto" />
          </div>
          <div className="mt-6 w-full max-w-[200px] h-1.5 rounded-full bg-primary/20 overflow-hidden">
            <div className="appLoader-bar h-full rounded-full bg-primary" />
          </div>
          <style>{`
            @keyframes appLoaderBar {
              0% { width: 0%; }
              50% { width: 70%; }
              100% { width: 0%; }
            }
            .appLoader-bar {
              animation: appLoaderBar 1.5s ease-in-out infinite;
            }
          `}</style>
          <p className="mt-3 text-sm text-slate-500 font-medium">Yükleniyor...</p>
        </div>
      )}
      {children}
    </>
  )
}
