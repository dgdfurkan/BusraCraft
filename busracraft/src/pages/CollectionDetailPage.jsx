import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCollections } from '../hooks/useCollections'
import PostCard from '../components/social/PostCard'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import EmptyState from '../components/ui/EmptyState'
import Icon from '../components/ui/Icon'
import { getDocument } from '../utils/firebaseHelpers'

export default function CollectionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getSaves } = useCollections(user?.uid)
  const [collection, setCollection] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const col = await getDocument('collections', id)
        setCollection(col)
        const savedPosts = await getSaves(id)
        setPosts(savedPosts)
      } catch (err) {
        console.error('Collection detail error:', err)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id, getSaves])

  if (loading) return <YarnBallSpinner text="Yükleniyor..." />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/koleksiyonlarim')}
          className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-slate-500 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
        >
          <Icon name="arrow_back" size="text-lg" />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <span>{collection?.emoji || '📌'}</span>
            {collection?.name || 'Koleksiyon'}
          </h1>
          <p className="text-sm text-slate-500">{posts.length} tarif kaydedildi</p>
        </div>
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title="Koleksiyon boş"
          description="Keşfet sayfasından bu koleksiyona tarif kaydet."
          actionLabel="Keşfet'e Git"
          onAction={() => navigate('/kesfet')}
        />
      ) : (
        <div className="max-w-2xl mx-auto space-y-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} variant="feed" />
          ))}
        </div>
      )}
    </motion.div>
  )
}
