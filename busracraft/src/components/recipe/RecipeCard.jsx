import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '../ui/Icon'

const DIFFICULTY_STYLES = {
  easy: 'bg-green-500',
  medium: 'bg-amber-500',
  hard: 'bg-red-500',
}

const DIFFICULTY_LABELS = {
  easy: 'Kolay',
  medium: 'Orta',
  hard: 'Zor',
}

export default function RecipeCard({ recipe, index = 0, viewMode = 'grid' }) {
  const navigate = useNavigate()
  const photo = recipe.photos?.[0] || null
  const diffStyle = DIFFICULTY_STYLES[recipe.difficulty] || DIFFICULTY_STYLES.easy
  const diffLabel = DIFFICULTY_LABELS[recipe.difficulty] || 'Kolay'

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04, duration: 0.3 }}
        onClick={() => navigate(`/tarif/${recipe.id}`)}
        className="group flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-primary/10 cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
      >
        {photo ? (
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
            <Icon name="menu_book" size="text-3xl" className="text-primary/30" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`${diffStyle} text-white text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-0.5`}>
              {diffLabel}
            </span>
            {recipe.yarnType && (
              <span className="text-slate-500 text-xs flex items-center gap-1">
                <Icon name="architecture" size="text-sm" className="text-slate-400" />
                {recipe.yarnType}
              </span>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
          <Icon name="arrow_forward_ios" size="text-base" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      onClick={() => navigate(`/tarif/${recipe.id}`)}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-primary/10 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt=""
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-primary/5 flex items-center justify-center">
            <Icon name="menu_book" size="text-5xl" className="text-primary/20" />
          </div>
        )}

        {/* Difficulty Badge */}
        <span className={`absolute top-3 left-3 ${diffStyle} text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg px-3 py-1`}>
          {diffLabel}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => { e.stopPropagation() }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <Icon name="favorite" size="text-lg" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {recipe.title}
        </h3>

        {recipe.yarnType && (
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1.5">
            <Icon name="architecture" size="text-base" className="text-slate-400" />
            <span className="truncate">{recipe.yarnType}</span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-primary/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Icon name="schedule" size="text-sm" />
            <span>{recipe.estimatedTime || '—'}</span>
          </div>
          <div className="flex items-center gap-1 text-primary font-bold text-xs uppercase tracking-wide group-hover:gap-2 transition-all duration-300">
            <span>İncele</span>
            <Icon name="arrow_forward" size="text-sm" className="group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
