import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { useToast } from '../../context/ToastContext'
import Logo from '../ui/Logo'

const difficultyLabels = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' }

const PRIMARY = '#f471b5'
const PRIMARY_DARK = '#ec4899'
const SLATE_800 = '#1e293b'
const SLATE_600 = '#475569'
const SLATE_500 = '#64748b'
const SLATE_400 = '#94a3b8'
const SLATE_100 = '#f1f5f9'
const WHITE = '#ffffff'

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
        backgroundColor: WHITE,
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
        backgroundColor: WHITE,
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
      className="fixed inset-0 z-[70] bg-black/60 flex items-end sm:items-center justify-center sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-slate-800 text-lg">Tarifi Paylaş</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-auto flex-1 min-h-0 flex flex-col items-center">
          <div
            ref={cardRef}
            style={{
              width: 340,
              maxWidth: '100%',
              backgroundColor: WHITE,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
            }}
          >
            {recipe.photos?.[0] ? (
              <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: SLATE_100 }}>
                <img
                  src={recipe.photos[0]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    right: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span style={{ opacity: 0.95 }}><Logo size={28} /></span>
                  <span style={{ color: WHITE, fontWeight: 700, fontSize: 13, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    BüşraCraft
                  </span>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
                  padding: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ opacity: 0.95 }}><Logo size={40} /></span>
                <span style={{ color: WHITE, fontWeight: 700, fontSize: 18 }}>BüşraCraft</span>
              </div>
            )}

            <div style={{ padding: 20 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: SLATE_800, lineHeight: 1.3, margin: 0 }}>
                {recipe.title}
              </h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                {recipe.categoryName && (
                  <span style={{ fontSize: 12, fontWeight: 600, color: PRIMARY }}>{recipe.categoryName}</span>
                )}
                {recipe.difficulty && (
                  <span style={{ fontSize: 12, color: SLATE_500 }}>
                    {difficultyLabels[recipe.difficulty] || recipe.difficulty}
                  </span>
                )}
              </div>

              {(recipe.steps || []).length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <h4 style={{ fontSize: 10, fontWeight: 700, color: SLATE_500, letterSpacing: '0.05em', marginBottom: 8, textTransform: 'uppercase' }}>
                    Yapılış
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(recipe.steps || []).slice(0, 8).map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8 }}>
                        <span
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: PRIMARY,
                            color: WHITE,
                            fontSize: 10,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {step.order || i + 1}
                        </span>
                        <p
                          style={{
                            fontSize: 12,
                            color: SLATE_600,
                            lineHeight: 1.5,
                            margin: 0,
                            flex: 1,
                          }}
                        >
                          {step.text}
                        </p>
                      </div>
                    ))}
                    {(recipe.steps || []).length > 8 && (
                      <p style={{ fontSize: 10, color: SLATE_400, fontStyle: 'italic', margin: 0 }}>
                        +{(recipe.steps || []).length - 8} adım daha...
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                style={{
                  paddingTop: 12,
                  marginTop: 16,
                  borderTop: `1px solid ${SLATE_100}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <Logo size={14} />
                <span style={{ fontSize: 10, fontWeight: 600, color: SLATE_500 }}>BüşraCraft</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-4 pt-2 border-t border-slate-200 flex gap-3 shrink-0"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          <button
            onClick={copyToClipboard}
            disabled={generating}
            className="flex-1 py-3.5 rounded-xl font-semibold text-base transition-colors disabled:opacity-50 cursor-pointer active:scale-[0.98]"
            style={{ backgroundColor: SLATE_100, color: SLATE_800 }}
          >
            Kopyala
          </button>
          <button
            onClick={generateAndShare}
            disabled={generating}
            className="flex-1 py-3.5 rounded-xl font-semibold text-base transition-colors disabled:opacity-50 cursor-pointer active:scale-[0.98]"
            style={{ backgroundColor: PRIMARY, color: WHITE }}
          >
            {generating ? 'Hazırlanıyor...' : 'İndir / Paylaş'}
          </button>
        </div>
      </div>
    </div>
  )
}
