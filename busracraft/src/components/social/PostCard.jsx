import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useLikes } from '../../hooks/useLikes'
import { useSaves } from '../../hooks/useSaves'
import { useCollections } from '../../hooks/useCollections'
import LikeButton from './LikeButton'
import SaveButton from './SaveButton'
import CommentSection from './CommentSection'
import SaveModal from './SaveModal'
import Icon from '../ui/Icon'

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Avatar({ name, url }) {
  if (url) {
    return <img src={url} alt={name} className="w-10 h-10 rounded-full object-cover" />
  }
  const initial = (name || '?')[0].toUpperCase()
  return (
    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
      {initial}
    </div>
  )
}

export default function PostCard({ post, variant = 'feed' }) {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { liked, toggle: toggleLike } = useLikes(post.id, user?.uid)
  const { saved, save: savePost } = useSaves(post.id, user?.uid)
  const { collections, add: addCollection } = useCollections(user?.uid)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const localLikeCount = post.likeCount + (liked ? 1 : 0) - (post._initialLiked ? 1 : 0)

  const handleSave = async (collectionId) => {
    await savePost(collectionId)
    setSaveModalOpen(false)
  }

  const goToRecipe = () => {
    if (post.recipeId) navigate(`/tarif/${post.recipeId}`)
  }

  if (variant === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group relative bg-white rounded-xl border border-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
        onClick={goToRecipe}
      >
        <div className="aspect-square relative overflow-hidden bg-slate-100">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <Icon name="image" size="text-4xl" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <h3 className="text-white font-bold text-sm leading-tight truncate">{post.title}</h3>
          </div>
        </div>
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-xs text-slate-500 truncate">{post.ownerName}</span>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-0.5">
              <Icon name="favorite" size="text-sm" fill={liked} className={liked ? 'text-red-500' : ''} />
              {post.likeCount || ''}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Avatar name={post.ownerName} url={post.ownerAvatar} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{post.ownerName}</p>
          <p className="text-[11px] text-slate-400">{formatDate(post.createdAt)}</p>
        </div>
        {post.category && (
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
            {post.category}
          </span>
        )}
      </div>

      {post.coverImageUrl && (
        <div
          className="aspect-video relative overflow-hidden bg-slate-100 cursor-pointer"
          onClick={goToRecipe}
        >
          <img
            src={post.coverImageUrl}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      )}

      <div className="px-4 py-3 space-y-2">
        <h3
          className="text-base font-bold text-slate-800 cursor-pointer hover:text-primary transition-colors"
          onClick={goToRecipe}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-2">{post.excerpt}</p>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-slate-100 flex items-center gap-5">
        <LikeButton
          liked={liked}
          count={post.likeCount || 0}
          onToggle={isAuthenticated ? toggleLike : undefined}
          disabled={!isAuthenticated}
        />
        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer"
        >
          <Icon name="chat_bubble_outline" size="text-xl" />
          {post.commentCount > 0 && <span>{post.commentCount}</span>}
        </button>
        <SaveButton
          saved={saved}
          count={post.saveCount || 0}
          onClick={isAuthenticated ? () => setSaveModalOpen(true) : undefined}
          disabled={!isAuthenticated}
        />
        <button
          type="button"
          onClick={goToRecipe}
          className="ml-auto flex items-center gap-1 text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          Tarife Git
          <Icon name="arrow_forward" size="text-sm" />
        </button>
      </div>

      {showComments && (
        <div className="px-4 py-3 border-t border-slate-100">
          <CommentSection postId={post.id} commentCount={post.commentCount} />
        </div>
      )}

      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        collections={collections}
        onSave={handleSave}
        onCreateCollection={addCollection}
      />
    </motion.div>
  )
}
