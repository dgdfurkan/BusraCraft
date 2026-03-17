export const DEFAULT_CATEGORIES = [
  { id: 'amigurumi', name: 'Amigurumi', emoji: '🧸', isDefault: true, order: 1 },
  { id: 'bere-sapka', name: 'Bere / Şapka', emoji: '🧢', isDefault: true, order: 2 },
  { id: 'atki-sal', name: 'Atkı / Şal', emoji: '🧣', isDefault: true, order: 3 },
  { id: 'yelek', name: 'Yelek', emoji: '🧥', isDefault: true, order: 4 },
  { id: 'corap', name: 'Çorap', emoji: '🧦', isDefault: true, order: 5 },
  { id: 'battaniye', name: 'Battaniye', emoji: '🛏️', isDefault: true, order: 6 },
  { id: 'canta', name: 'Çanta', emoji: '👜', isDefault: true, order: 7 },
  { id: 'ev-dekorasyon', name: 'Ev Dekorasyon', emoji: '🏠', isDefault: true, order: 8 },
  { id: 'bebek', name: 'Bebek', emoji: '👶', isDefault: true, order: 9 },
  { id: 'diger', name: 'Diğer', emoji: '🧶', isDefault: true, order: 10 },
]

export const DIFFICULTIES = [
  { id: 'easy', label: 'Kolay', emoji: '🟢', color: '#10B981' },
  { id: 'medium', label: 'Orta', emoji: '🟡', color: '#F59E0B' },
  { id: 'hard', label: 'Zor', emoji: '🔴', color: '#EF4444' },
]

export const SORT_OPTIONS = [
  { id: 'newest', label: 'En Yeni' },
  { id: 'oldest', label: 'En Eski' },
  { id: 'az', label: 'A → Z' },
  { id: 'za', label: 'Z → A' },
]

export const DAILY_LIMITS = {
  reads: 40000,
  writes: 15000,
}

export const IMAGE_CONFIG = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.75,
  thumbnailWidth: 400,
  thumbnailHeight: 400,
  thumbnailQuality: 0.6,
  maxSizeMB: 0.3,
}

export const MOTIVATIONAL_QUOTES = [
  'Her ilmek bir sevgi, her sıra bir hikaye 🧶',
  'Bugün ne örmeye ne dersin? ✨',
  'Sabırla örülen her şey güzeldir 🌸',
  'İplik iplik hayaller, ilmek ilmek gerçekler 🪡',
  'Ellerinin emeği, kalbinin sesi 💕',
  'Bir ilmek daha, bir adım daha yakınsın 🎀',
  'Örgü terapisi zamanı, ipi al ve rahatla 🧘‍♀️',
  'Yaratıcılığın sınırı yok, tığın da öyle 🌈',
  'İğne iplik bir olunca, mucizeler olur 🪄',
  'Düğüm atma, ilmek at! 😄',
  'Her örgü bir meditasyon, her ilmek bir nefes 🍃',
  'Bugünün ilmeği, yarının şaheseri 🎨',
  'Örgü örmek, zihni dinlendiren sessiz bir şiirdir 📝',
  'Ellerinle yaratmak, ruhunu beslemektir 🌷',
  'İp ve tığ varsa, imkansız yoktur 💪',
]
