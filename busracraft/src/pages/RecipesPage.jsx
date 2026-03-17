import { useState } from 'react'
import PageTransition from '../components/layout/PageTransition'
import RecipeGrid from '../components/recipe/RecipeGrid'
import SearchBar from '../components/search/SearchBar'
import FilterBar from '../components/search/FilterBar'
import Icon from '../components/ui/Icon'
import { useSearch } from '../hooks/useSearch'

const tabs = [
  { id: 'all', label: 'Tümü', icon: 'grid_view' },
  { id: 'favorites', label: 'Favoriler', icon: 'favorite' },
  { id: 'completed', label: 'Tamamlananlar', icon: 'check_circle' },
]

export default function RecipesPage({ recipes, loading, categories }) {
  const { searchTerm, setSearchTerm, filters, updateFilter, clearFilters, results, hasActiveFilters } = useSearch(recipes)
  const [activeTab, setActiveTab] = useState('all')

  const filteredByTab = results.filter((recipe) => {
    if (activeTab === 'favorites') return recipe.isFavorite
    if (activeTab === 'completed') return recipe.isCompleted
    return true
  })

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Örgü Kütüphanem</h1>
            <p className="text-slate-500 mt-1">İlham dolu tariflerin tek bir yerde.</p>
          </div>

          {/* Tab Buttons */}
          <div className="flex bg-primary/10 p-1 rounded-xl border border-primary/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon name={tab.icon} size="text-base" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <FilterBar
          categories={categories}
          filters={filters}
          onFilterChange={updateFilter}
          onClear={clearFilters}
          hasActive={hasActiveFilters}
        />

        <RecipeGrid recipes={filteredByTab} loading={loading} />
      </div>
    </PageTransition>
  )
}
