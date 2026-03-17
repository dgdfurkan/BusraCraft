import { useMemo } from 'react'
import PageTransition from '../components/layout/PageTransition'
import SearchBar from '../components/search/SearchBar'
import FilterBar from '../components/search/FilterBar'
import RecipeGrid from '../components/recipe/RecipeGrid'
import Icon from '../components/ui/Icon'
import { useSearch } from '../hooks/useSearch'

export default function SearchPage({ recipes, categories }) {
  const { searchTerm, setSearchTerm, filters, updateFilter, clearFilters, results, hasActiveFilters } = useSearch(recipes)

  const recentSearches = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('busracraft_recentSearches') || '[]')
    } catch { return [] }
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim()) {
      const updated = [term.trim(), ...recentSearches.filter((s) => s !== term.trim())].slice(0, 5)
      localStorage.setItem('busracraft_recentSearches', JSON.stringify(updated))
    }
  }

  return (
    <PageTransition>
      <div className="space-y-5">
        <SearchBar value={searchTerm} onChange={handleSearch} autoFocus />

        <FilterBar
          categories={categories}
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
          hasActive={hasActiveFilters}
        />

        {!searchTerm && recentSearches.length > 0 && (
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-3">
              <Icon name="history" size="text-base" className="text-primary" />
              Son Aramalar
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 rounded-full bg-white border border-primary/20 text-sm text-slate-600 hover:bg-primary/5 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Icon name="history" size="text-sm" className="text-slate-400" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <RecipeGrid recipes={results} loading={false} />
      </div>
    </PageTransition>
  )
}
