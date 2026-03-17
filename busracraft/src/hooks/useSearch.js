import { useState, useMemo, useCallback, useEffect } from 'react'
import { searchRecipes } from '../utils/searchUtils'

export function useSearch(recipes) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [filters, setFilters] = useState({})

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const results = useMemo(
    () => searchRecipes(recipes, debouncedTerm, filters),
    [recipes, debouncedTerm, filters]
  )

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => {
      if (value === null || value === undefined || value === '') {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
    setSearchTerm('')
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    results,
    hasActiveFilters: Object.keys(filters).length > 0 || searchTerm.length > 0,
  }
}
