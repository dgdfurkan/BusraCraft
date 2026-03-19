import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { useToast } from '../../context/ToastContext'
import Logo from '../ui/Logo'

const difficultyLabels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' }

export default function RecipeShareCard({ recipe, onClose }) {
  const cardRef = useRef(null)
  const [generating, setGenerating] = useState(false)
  const { addToast } = useToast()

  const generateAndShare = async () => {
    if (!cardRef.current || !recipe) return
    setGenerating(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 1))
      const file = new File([blob], `${recipe.title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '')}.png`, {
        type: 'image/png',
      })

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const canShare = navigator.share && (navigator.canShare ? navigator.canShare({ files: [file] }) : true)

      if (isMobile && canShare) {
        await navigator.share({
          files: [file],
          title: recipe.title,
          text: `${recipe.title} - BüşraCraft`,
        })
        addToast('Paylaşıldı!', 'success')
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${recipe.title.replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]/g, '')}.png`
        a.click()
        URL.revokeObjectURL(url)
        addToast('Galeriye kaydedildi!', 'success')
      }
      onClose?.()
    } catch (err) {
      if (err.name !== 'AbortError') {
        addToast(err?.message || 'Bir hata oluştu', 'error')
      }
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    if (!cardRef.current || !recipe) return
    setGenerating(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ])
          addToast('Panoya kopyalandı!', 'success')
          onClose?.()
        } catch {
          addToast('Kopyalama desteklenmiyor', 'error')
        } finally {
          setGenerating(false)
        }
      }, 'image/png', 1)
    } catch (err) {
      addToast(err?.message || 'Bir hata oluştu', 'error')
      setGenerating(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Tarifi Paylaş</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-auto flex-1">
          <div
            ref={cardRef}
            className="bg-white rounded-xl overflow-hidden shadow-lg"
            style={{ width: 400 }}
          >
            {/* Cover */}
            {recipe.photos?.[0] ? (
              <div className="relative aspect-[4/3] bg-slate-100">
                <img
                  src={recipe.photos[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <Logo size={32} className="opacity-95" />
                  <span className="text-white font-bold text-sm drop-shadow">BüşraCraft</span>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary/90 to-primary p-6 flex items-center gap-3">
                <Logo size={48} className="opacity-95" />
                <span className="text-white font-bold text-xl">BüşraCraft</span>
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 leading-tight">
                  {recipe.title}
                </h2>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  {recipe.categoryName && (
                    <span className="text-xs font-semibold text-primary">
                      {recipe.categoryName}
                    </span>
                  )}
                  {recipe.difficulty && (
                    <span className="text-xs text-slate-500">
                      {difficultyLabels[recipe.difficulty] || recipe.difficulty}
                    </span>
                  )}
                </div>
              </div>

              {(recipe.steps || []).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Yapılış
                  </h4>
                  <div className="space-y-2">
                    {(recipe.steps || []).slice(0, 8).map((step, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {step.order || i + 1}
                        </span>
                        <p className="text-xs text-slate-600 leading-relaxed flex-1 line-clamp-2">
                          {step.text}
                        </p>
                      </div>
                    ))}
                    {(recipe.steps || []).length > 8 && (
                      <p className="text-[10px] text-slate-400 italic">
                        +{(recipe.steps || []).length - 8} adım daha...
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1">
                <Logo size={16} />
                <span className="text-[10px] font-semibold text-slate-500">BüşraCraft</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={copyToClipboard}
            disabled={generating}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            Kopyala
          </button>
          <button
            onClick={generateAndShare}
            disabled={generating}
            className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            {generating ? 'Hazırlanıyor...' : 'İndir / Paylaş'}
          </button>
        </div>
      </div>
    </div>
  )
}
