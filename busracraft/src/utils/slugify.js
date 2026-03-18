const turkishMap = {
  ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'i',
  ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U',
}

export function slugify(str) {
  if (!str || typeof str !== 'string') return ''
  return str
    .trim()
    .split('')
    .map((c) => turkishMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'user'
}
