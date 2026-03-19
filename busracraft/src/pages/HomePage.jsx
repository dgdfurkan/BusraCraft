import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import RecipeCard from '../components/recipe/RecipeCard'
import Icon from '../components/ui/Icon'
import CatYarnAnimation from '../components/ui/animations/CatYarnAnimation'
import { useAuth } from '../context/AuthContext'
import { MOTIVATIONAL_QUOTES } from '../utils/constants'

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1200',
  'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200',
  'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1200',
  'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200',
]

const STAT_ITEMS = [
  { key: 'total', icon: 'menu_book', label: 'Toplam Tarif', color: 'bg-primary/20 text-primary' },
  { key: 'categories', icon: 'category', label: 'Kategori', color: 'bg-amber-100 text-amber-600' },
  { key: 'completed', icon: 'verified', label: 'Tamamlanan', color: 'bg-emerald-100 text-emerald-600' },
]

const QUICK_ACTIONS = [
  { icon: 'add_circle', label: 'Yeni Tarif', path: '/tarif-ekle' },
  { icon: 'menu_book', label: 'Tariflerim', path: '/tarifler' },
  { icon: 'photo_camera', label: 'Fotoğraftan Oku', path: '/tarif-ekle?ocr=1' },
]

export default function HomePage({ recipes, loading }) {
  const navigate = useNavigate()
  const { user, userProfile } = useAuth()

  const quote = useMemo(
    () => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)],
    []
  )

  const bannerImage = useMemo(
    () => BANNER_IMAGES[Math.floor(Math.random() * BANNER_IMAGES.length)],
    []
  )

  const welcomeName = user
    ? (userProfile?.displayName || user.displayName || '').trim() || 'Değerli Üye'
    : null

  const recentRecipes = useMemo(
    () => (recipes || []).slice(0, 6),
    [recipes]
  )

  const stats = useMemo(() => {
    const r = recipes || []
    const categories = new Set(r.map((rec) => rec.category).filter(Boolean))
    const completed = r.filter((rec) => rec.completed).length
    return { total: r.length, categories: categories.size, completed }
  }, [recipes])

  return (
    <PageTransition>
      <div className="space-y-8">
        {/* Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-48 rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src={bannerImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          <div className="relative h-full flex flex-col items-start justify-center px-8 text-left">
            <Icon name="format_quote" size="text-4xl" className="text-white/40 mb-2" />
            <p className="text-white text-lg font-semibold leading-relaxed max-w-md">
              {quote}
            </p>
            <p className="text-white/90 text-sm mt-3 font-medium">
              {welcomeName ? `Hoş geldin, ${welcomeName}` : 'Hoş geldin'}
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAT_ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/70 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                  <Icon name={item.icon} size="text-2xl" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">{item.label}</p>
                  <p className="text-3xl font-black text-slate-900">{stats[item.key]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-4"
        >
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex-1 min-w-[200px] h-16 bg-white rounded-2xl flex items-center justify-center gap-3 border-2 border-primary/20 hover:border-primary transition-all duration-300 group cursor-pointer"
            >
              <Icon
                name={action.icon}
                size="text-2xl"
                className="text-primary group-hover:scale-110 transition-transform duration-300"
              />
              <span className="font-semibold text-slate-700 group-hover:text-primary transition-colors">
                {action.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Recent Recipes */}
        {recentRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Son Tariflerim</h2>
              <button
                onClick={() => navigate('/tarifler')}
                className="text-primary font-bold text-sm hover:underline flex items-center gap-1 transition-colors"
              >
                Hepsini Gör
                <Icon name="arrow_forward" size="text-base" className="text-primary" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && recentRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-64 mx-auto mb-4">
              <CatYarnAnimation className="w-full h-auto" />
            </div>
            <p className="text-slate-500 text-base mb-6">
              Henüz tarif eklenmemiş. İlk tarifini ekleyerek başla!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/tarif-ekle')}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer"
            >
              <Icon name="add" size="text-xl" className="text-white" />
              Tarif Ekle
            </motion.button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  )
}
