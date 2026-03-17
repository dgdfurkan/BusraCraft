const turkishMap = {
  ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I',
  ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U',
}

function normalizeTurkish(str) {
  return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, (c) => turkishMap[c] || c).toLowerCase()
}

export function searchRecipes(recipes, searchTerm, filters = {}) {
  let results = [...recipes]

  if (searchTerm && searchTerm.trim()) {
    const normalizedSearch = normalizeTurkish(searchTerm.trim())
    results = results.filter((recipe) => {
      const fields = [
        recipe.title,
        recipe.notes,
        recipe.yarnInfo?.brand,
        recipe.yarnInfo?.color,
        recipe.needleSize,
        ...(recipe.tags || []),
        ...(recipe.steps || []).map((s) => s.text),
      ]
      return fields.some(
        (field) => field && normalizeTurkish(String(field)).includes(normalizedSearch)
      )
    })
  }

  if (filters.category) {
    results = results.filter((r) => r.category === filters.category)
  }

  if (filters.difficulty) {
    results = results.filter((r) => r.difficulty === filters.difficulty)
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((r) =>
      filters.tags.some((tag) => (r.tags || []).includes(tag))
    )
  }

  const sortBy = filters.sortBy || 'newest'
  switch (sortBy) {
    case 'oldest':
      results.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0))
      break
    case 'az':
      results.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'tr'))
      break
    case 'za':
      results.sort((a, b) => (b.title || '').localeCompare(a.title || '', 'tr'))
      break
    default:
      results.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
  }

  return results
}

export function highlightMatch(text, searchTerm) {
  if (!searchTerm || !text) return text
  const normalizedText = normalizeTurkish(text)
  const normalizedSearch = normalizeTurkish(searchTerm)
  const idx = normalizedText.indexOf(normalizedSearch)
  if (idx === -1) return text
  return {
    before: text.slice(0, idx),
    match: text.slice(idx, idx + searchTerm.length),
    after: text.slice(idx + searchTerm.length),
  }
}
