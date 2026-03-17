const MODEL = 'gemini-2.5-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const OCR_PROMPT = `Bu fotoğraftaki örgü tarifini oku ve analiz et. El yazısı veya basılı olabilir.
Fotoğraftaki TÜM yazıları eksiksiz oku, hiçbir adımı veya notu atlama.
Yanıtını SADECE aşağıdaki JSON formatında ver, başka hiçbir açıklama ekleme:
{
  "title": "Tarif adı",
  "steps": [
    {"order": 1, "text": "Adım açıklaması"}
  ],
  "notes": "Varsa ek notlar, yoksa boş string"
}
Tüm metni eksiksiz oku. Türkçe yaz.`

export function getGeminiApiKey() {
  return localStorage.getItem('busracraft_gemini_key') || ''
}

export function setGeminiApiKey(key) {
  if (key) {
    localStorage.setItem('busracraft_gemini_key', key.trim())
  } else {
    localStorage.removeItem('busracraft_gemini_key')
  }
}

function cleanAndParseJSON(text) {
  let raw = text.trim()

  const codeBlockMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) raw = codeBlockMatch[1].trim()

  const jsonMatch = raw.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('API yanıtında JSON bulunamadı')

  let jsonStr = jsonMatch[0]

  try {
    return JSON.parse(jsonStr)
  } catch {
    // trailing comma temizliği: ,] → ] ve ,} → }
    jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1')
    // kontrol karakterlerini string içlerinden temizle
    jsonStr = jsonStr.replace(/[\x00-\x1F\x7F]/g, (ch) => {
      if (ch === '\n' || ch === '\r' || ch === '\t') return ' '
      return ''
    })

    try {
      return JSON.parse(jsonStr)
    } catch (e) {
      throw new Error(`JSON ayrıştırma hatası: ${e.message}`)
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function recognizeWithGemini(base64Image) {
  const apiKey = getGeminiApiKey()
  if (!apiKey) {
    throw new Error('Gemini API anahtarı gerekli. Ayarlar sayfasından girin.')
  }

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const mimeMatch = base64Image.match(/^data:(image\/\w+);base64,/)
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg'

  const body = {
    contents: [{
      parts: [
        { text: OCR_PROMPT },
        { inline_data: { mime_type: mimeType, data: base64Data } }
      ]
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 4096,
      responseMimeType: 'application/json',
    }
  }

  const maxRetries = 1

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    let response
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify(body),
      })
    } catch {
      throw new Error('Gemini API bağlantı hatası. İnternet bağlantınızı kontrol edin.')
    }

    if (response.status === 429) {
      if (attempt < maxRetries) {
        await sleep(3000)
        continue
      }
      throw new Error('Gemini istek limiti aşıldı. Birkaç dakika bekleyip tekrar deneyin.')
    }

    if (response.status === 403 || response.status === 401) {
      throw new Error('Gemini API anahtarı geçersiz. Ayarlar sayfasından kontrol edin.')
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(`Gemini hatası: ${errData.error?.message || `HTTP ${response.status}`}`)
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!content) {
      throw new Error('Gemini boş yanıt döndü. Fotoğrafı tekrar deneyin.')
    }

    return cleanAndParseJSON(content)
  }
}
