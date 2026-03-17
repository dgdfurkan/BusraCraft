import { useState } from 'react'
import { motion } from 'framer-motion'
import RecipeCard from './RecipeCard'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'
import { useNavigate } from 'react-router-dom'

function SkeletonCard() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/10 animate-pulse">
      <div className="h-48 bg-primary/5" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-primary/10 rounded-lg w-3/4" />
        <div className="h-4 bg-primary/5 rounded-lg w-1/2" />
        <div className="mt-4 pt-4 border-t border-primary/5 flex items-center justify-between">
          <div className="h-3 bg-primary/5 rounded w-16" />
          <div className="h-3 bg-primary/10 rounded w-12" />
        </div>
      </div>
    </div>
  )
}

export default function RecipeGrid({ recipes, loading }) {
  const [viewMode, setViewMode] = useState(() =>
    localStorage.getItem('busracraft_viewMode') || 'grid'
  )
  const navigate = useNavigate()

  const setMode = (mode) => {
    setViewMode(mode)
    localStorage.setItem('busracraft_viewMode', mode)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <EmptyState
        title="Henüz tarif eklenmemiş"
        description="İlk tarifini ekleyerek başla!"
        actionLabel="Tarif Ekle"
        onAction={() => navigate('/tarif-ekle')}
      />
    )
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 bg-primary/10 p-1 rounded-xl border border-primary/20">
          <button
            onClick={() => setMode('grid')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-primary text-white shadow-sm'
                : 'text-primary hover:bg-primary/5'
            }`}
          >
            <Icon name="grid_view" size="text-lg" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setMode('list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-primary text-white shadow-sm'
                : 'text-primary hover:bg-primary/5'
            }`}
          >
            <Icon name="view_list" size="text-lg" />
            <span className="hidden sm:inline">Liste</span>
          </button>
        </div>
      </div>

      {/* Recipe Grid / List */}
      <motion.div
        layout
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
            : 'flex flex-col gap-3'
        }
      >
        {recipes.map((recipe, i) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={i} viewMode={viewMode} />
        ))}
      </motion.div>
    </div>
  )
}
