import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import ThemeSelector from '../components/settings/ThemeSelector'
import Icon from '../components/ui/Icon'
import { useToast } from '../context/ToastContext'
import { getPollinationsApiKey, setPollinationsApiKey } from '../utils/pollinationsApi'
import { getGeminiApiKey, setGeminiApiKey } from '../utils/geminiApi'
import { getOcrProvider, setOcrProvider } from '../utils/ocrService'

const PROVIDERS = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: 'auto_awesome',
    description: 'Günde 1500 ücretsiz istek, çok iyi Türkçe OCR',
    keyUrl: 'https://aistudio.google.com/apikey',
    keyHint: 'Google AI Studio\'dan ücretsiz anahtar al',
    placeholder: 'AIza...',
  },
  {
    id: 'pollinations',
    name: 'Pollinations AI',
    icon: 'eco',
    description: 'Saatte ~10 ücretsiz istek, açık kaynak',
    keyUrl: 'https://enter.pollinations.ai',
    keyHint: 'Pollinations\'dan ücretsiz anahtar al',
    placeholder: 'pk_...',
  },
]

export default function SettingsPage() {
  const { addToast } = useToast()
  const viewMode = localStorage.getItem('busracraft_viewMode') || 'grid'
  const [activeProvider, setActiveProvider] = useState(() => getOcrProvider())
  const [geminiKey, setGeminiKey] = useState(() => getGeminiApiKey())
  const [pollinationsKey, setPollinationsKey] = useState(() => getPollinationsApiKey())
  const [showGeminiKey, setShowGeminiKey] = useState(false)
  const [showPollinationsKey, setShowPollinationsKey] = useState(false)

  const toggleViewDefault = () => {
    const next = viewMode === 'grid' ? 'list' : 'grid'
    localStorage.setItem('busracraft_viewMode', next)
    window.location.reload()
  }

  const handleProviderChange = (id) => {
    setActiveProvider(id)
    setOcrProvider(id)
    addToast(`OCR sağlayıcısı: ${PROVIDERS.find(p => p.id === id).name}`, 'success')
  }

  const saveGeminiKey = () => {
    setGeminiApiKey(geminiKey)
    addToast('Gemini API anahtarı kaydedildi', 'success')
  }

  const savePollinationsKey = () => {
    setPollinationsApiKey(pollinationsKey)
    addToast('Pollinations API anahtarı kaydedildi', 'success')
  }

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="palette" className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Tema Seçimi</h3>
          </div>
          <ThemeSelector />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="visibility" className="text-primary" />
            <h3 className="text-sm font-semibold text-text">Görünüm</h3>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-primary/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-text">Varsayılan Görünüm</p>
                <p className="text-xs text-text-secondary mt-0.5">
                  Tarif listesinin varsayılan görünümü
                </p>
              </div>
              <button
                onClick={toggleViewDefault}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 text-sm font-medium text-text hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Icon
                  name={viewMode === 'grid' ? 'grid_view' : 'view_list'}
                  size="text-lg"
                  className="text-primary"
                />
                {viewMode === 'grid' ? 'Grid' : 'Liste'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon name="smart_toy" className="text-primary" />
            <h3 className="text-sm font-semibold text-text">AI / OCR Ayarları</h3>
          </div>

          <div className="space-y-3">
            {PROVIDERS.map((provider) => {
              const isActive = activeProvider === provider.id
              const key = provider.id === 'gemini' ? geminiKey : pollinationsKey
              const setKey = provider.id === 'gemini' ? setGeminiKey : setPollinationsKey
              const saveKey = provider.id === 'gemini' ? saveGeminiKey : savePollinationsKey
              const showKey = provider.id === 'gemini' ? showGeminiKey : showPollinationsKey
              const toggleShowKey = provider.id === 'gemini'
                ? () => setShowGeminiKey(!showGeminiKey)
                : () => setShowPollinationsKey(!showPollinationsKey)

              return (
                <div
                  key={provider.id}
                  className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                    isActive
                      ? 'border-primary shadow-md shadow-primary/10'
                      : 'border-primary/10 opacity-75'
                  }`}
                >
                  <button
                    onClick={() => handleProviderChange(provider.id)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      <Icon name={provider.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text">{provider.name}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{provider.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'border-primary bg-primary' : 'border-slate-300'
                    }`}>
                      {isActive && <Icon name="check" size="text-sm" className="text-white" />}
                    </div>
                  </button>

                  {isActive && (
                    <div className="px-5 pb-5 pt-0 space-y-3 border-t border-primary/10">
                      <div className="pt-4">
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <input
                              type={showKey ? 'text' : 'password'}
                              value={key}
                              onChange={(e) => setKey(e.target.value)}
                              placeholder={provider.placeholder}
                              className="w-full px-4 py-2.5 rounded-xl border border-primary/10 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary pr-10"
                            />
                            <button
                              type="button"
                              onClick={toggleShowKey}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                            >
                              <Icon name={showKey ? 'visibility_off' : 'visibility'} size="text-lg" />
                            </button>
                          </div>
                          <button
                            onClick={saveKey}
                            className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-sm transition-colors shadow-sm shadow-primary/20"
                          >
                            Kaydet
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        {key ? (
                          <div className="flex items-center gap-1.5 text-xs text-success">
                            <Icon name="check_circle" size="text-sm" fill />
                            <span>API anahtarı kayıtlı</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <Icon name="info" size="text-sm" />
                            <span>API anahtarı gerekli</span>
                          </div>
                        )}
                        <a
                          href={provider.keyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          <Icon name="open_in_new" size="text-xs" />
                          {provider.keyHint}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Icon name="self_improvement" size="text-3xl" className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary">BüşraCraft</h3>
            <p className="text-xs text-text-secondary italic">
              İlmek ilmek, dijital defterim
            </p>
            <p className="text-xs text-text-secondary">Sürüm 1.0.0</p>
            <div className="flex items-center justify-center gap-1 text-xs text-text-secondary">
              <span>Büşra için sevgiyle yapıldı</span>
              <Icon name="favorite" size="text-sm" className="text-primary" fill />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
