import { recognizeRecipeFromImage, getPollinationsApiKey } from './pollinationsApi'
import { recognizeWithGemini, getGeminiApiKey } from './geminiApi'

const PROVIDER_KEY = 'busracraft_ocr_provider'

export function getOcrProvider() {
  return localStorage.getItem(PROVIDER_KEY) || 'gemini'
}

export function setOcrProvider(provider) {
  localStorage.setItem(PROVIDER_KEY, provider)
}

export function hasActiveApiKey() {
  const provider = getOcrProvider()
  if (provider === 'gemini') return !!getGeminiApiKey()
  if (provider === 'pollinations') return !!getPollinationsApiKey()
  return false
}

export function getProviderInfo() {
  const provider = getOcrProvider()
  if (provider === 'gemini') {
    return {
      id: 'gemini',
      name: 'Google Gemini',
      hasKey: !!getGeminiApiKey(),
      keyUrl: 'https://aistudio.google.com/apikey',
      keyLabel: 'Ücretsiz anahtar al (Google AI Studio)',
    }
  }
  return {
    id: 'pollinations',
    name: 'Pollinations AI',
    hasKey: !!getPollinationsApiKey(),
    keyUrl: 'https://enter.pollinations.ai',
    keyLabel: 'Ücretsiz anahtar al (Pollinations)',
  }
}

export async function recognizeRecipe(base64Image) {
  const provider = getOcrProvider()
  if (provider === 'gemini') return recognizeWithGemini(base64Image)
  if (provider === 'pollinations') return recognizeRecipeFromImage(base64Image)
  throw new Error('Geçersiz OCR sağlayıcısı. Ayarlardan bir sağlayıcı seçin.')
}
