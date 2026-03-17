const API_URL = 'https://gen.pollinations.ai/v1/chat/completions'

const OCR_PROMPT = `Bu fotoğraftaki el yazısı örgü tarifini oku ve analiz et.
Yanıtını SADECE aşağıdaki JSON formatında ver, başka hiçbir açıklama ekleme:
{
  "title": "Tarif adı",
  "steps": [
    {"order": 1, "text": "Adım açıklaması"}
  ],
  "notes": "Varsa ek notlar, yoksa boş string"
}
Türkçe yaz. Markdown code block KULLANMA, sadece ham JSON döndür.`

function getApiKey() {
  return localStorage.getItem('busracraft_pollinations_key') || ''
}

export function setPollinationsApiKey(key) {
  if (key) {
    localStorage.setItem('busracraft_pollinations_key', key.trim())
  } else {
    localStorage.removeItem('busracraft_pollinations_key')
  }
}

export function getPollinationsApiKey() {
  return getApiKey()
}

function extractJSON(text) {
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    const inner = codeBlockMatch[1].trim()
    const jsonInner = inner.match(/\{[\s\S]*\}/)
    if (jsonInner) return JSON.parse(jsonInner[0])
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) return JSON.parse(jsonMatch[0])

  throw new Error('API yanıtında JSON bulunamadı')
}

export async function recognizeRecipeFromImage(base64Image) {
  const apiKey = getApiKey()

  const headers = { 'Content-Type': 'application/json' }
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`
  }

  let response
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openai-fast',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: OCR_PROMPT },
              { type: 'image_url', image_url: { url: base64Image } },
            ],
          },
        ],
        temperature: 0.1,
      }),
    })
  } catch (err) {
    throw new Error('API bağlantı hatası. İnternet bağlantınızı kontrol edin.')
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error('API anahtarı gerekli veya geçersiz. Ayarlar sayfasından Pollinations API anahtarınızı girin.')
  }

  if (response.status === 402) {
    throw new Error('Pollen bakiyeniz yetersiz. enter.pollinations.ai adresinden bakiyenizi kontrol edin.')
  }

  if (!response.ok) {
    const errBody = await response.text().catch(() => '')
    throw new Error(`API hatası (${response.status}): ${errBody || 'Bilinmeyen hata'}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) throw new Error('API boş yanıt döndü. Lütfen tekrar deneyin.')

  return extractJSON(content)
}
