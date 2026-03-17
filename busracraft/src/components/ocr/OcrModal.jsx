import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import OcrPreview from './OcrPreview'
import YarnBallSpinner from '../ui/animations/YarnBallSpinner'
import { useOCR } from '../../hooks/useOCR'
import { hasActiveApiKey, getProviderInfo } from '../../utils/ocrService'

export default function OcrModal({ isOpen, onClose, onResult }) {
  const { processImage, processing, result, error, reset } = useOCR()
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)
  const navigate = useNavigate()
  const hasKey = hasActiveApiKey()
  const providerInfo = getProviderInfo()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    await processImage(file)
  }

  const handleAccept = () => {
    if (result) {
      onResult(result)
      handleClose()
    }
  }

  const handleRetry = () => {
    reset()
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleClose = () => {
    reset()
    setPreview(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Fotoğraftan Tarif Oku" size="md">
      <div className="space-y-5">
        {!hasKey && !preview && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center space-y-3">
            <Icon name="key" size="text-3xl" className="text-amber-500" />
            <p className="text-sm font-medium text-amber-800">
              {providerInfo.name} API anahtarı gerekli
            </p>
            <p className="text-xs text-amber-600">
              Ücretsiz anahtar alıp Ayarlar sayfasından girebilirsin.
            </p>
            <div className="flex justify-center gap-2">
              <a
                href={providerInfo.keyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Icon name="open_in_new" size="text-sm" />
                Anahtar Al
              </a>
              <button
                onClick={() => { handleClose(); navigate('/ayarlar') }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-amber-300 text-amber-700 text-sm font-semibold rounded-xl hover:bg-amber-50 transition-colors"
              >
                <Icon name="settings" size="text-sm" />
                Ayarlar
              </button>
            </div>
          </div>
        )}

        {hasKey && !preview && (
          <div className="space-y-3">
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
            >
              <Icon name="document_scanner" size="text-5xl" className="text-primary mb-3 block mx-auto" />
              <p className="text-sm font-medium text-text">
                Fotoğraf çekin veya galeriden seçin
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {providerInfo.name} ile otomatik tarif tanıma
              </p>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        )}

        {preview && (
          <div className="rounded-2xl overflow-hidden relative border border-primary/10">
            <img src={preview} alt="OCR önizleme" className="w-full max-h-64 object-contain bg-primary/5" />
            {processing && (
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white/90 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-xl">
                  <Icon name="progress_activity" size="text-2xl" className="text-primary animate-spin" />
                  <span className="text-sm font-medium text-text">Okunuyor...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {processing && <YarnBallSpinner text="Tarif okunuyor..." />}

        {error && (
          <div className="text-center py-4 bg-red-50 rounded-2xl px-4">
            <Icon name="error" size="text-3xl" className="text-red-400 mb-2" />
            <p className="text-sm text-error mb-3">{error}</p>
            <div className="flex justify-center gap-2">
              <Button variant="secondary" size="sm" icon="refresh" onClick={handleRetry}>
                Tekrar Dene
              </Button>
              {(error.includes('API anahtarı') || error.includes('geçersiz')) && (
                <Button
                  variant="primary"
                  size="sm"
                  icon="settings"
                  onClick={() => { handleClose(); navigate('/ayarlar') }}
                >
                  Ayarlar
                </Button>
              )}
            </div>
          </div>
        )}

        {result && (
          <OcrPreview
            result={result}
            onAccept={handleAccept}
            onRetry={handleRetry}
          />
        )}
      </div>
    </Modal>
  )
}
