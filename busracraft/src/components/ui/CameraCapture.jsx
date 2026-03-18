import { useState, useRef, useEffect } from 'react'
import Icon from './Icon'
import Modal from './Modal'

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [error, setError] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let stream
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s
        streamRef.current = s
        if (videoRef.current) {
          videoRef.current.srcObject = s
        }
        setReady(true)
      })
      .catch((err) => {
        setError(err.message || 'Kamera erişilemedi.')
      })

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const capture = () => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' })
          onCapture(file)
          onClose()
        }
      },
      'image/jpeg',
      0.9
    )
  }

  const stopAndClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
    }
    onClose()
  }

  return (
    <Modal isOpen onClose={stopAndClose} title="Kamera ile Çek">
      <div className="space-y-4">
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : (
          <>
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {!ready && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <span className="animate-pulse">Kamera açılıyor...</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={capture}
                disabled={!ready}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Icon name="photo_camera" size="text-xl" />
                Fotoğraf Çek
              </button>
              <button
                type="button"
                onClick={stopAndClose}
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 cursor-pointer"
              >
                İptal
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
