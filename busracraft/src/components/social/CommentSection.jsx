import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useComments } from '../../hooks/useComments'
import { useAuth } from '../../context/AuthContext'
import CommentInput from './CommentInput'
import Icon from '../ui/Icon'
import Modal from '../ui/Modal'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'Az önce'
  if (diff < 3600) return `${Math.floor(diff / 60)}dk`
  if (diff < 86400) return `${Math.floor(diff / 3600)}sa`
  if (diff < 604800) return `${Math.floor(diff / 86400)}g`
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
}

function Avatar({ name, url, size = 'w-8 h-8' }) {
  if (url) {
    return <img src={url} alt={name} className={`${size} rounded-full object-cover`} />
  }
  const initial = (name || '?')[0].toUpperCase()
  return (
    <div className={`${size} rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center`}>
      {initial}
    </div>
  )
}

function CommentItem({ comment, onDelete, isOwner }) {
  if (comment.isDeleted) {
    return (
      <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-50 text-slate-400 text-xs italic">
        <Icon name="delete" size="text-sm" />
        Bu yorum silindi.
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-2.5 group"
    >
      <Avatar name={comment.authorName} url={comment.authorAvatar} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-800 truncate">{comment.authorName}</span>
          <span className="text-[10px] text-slate-400 shrink-0">{formatTime(comment.createdAt)}</span>
        </div>
        <p className="text-sm text-slate-600 mt-0.5 break-words whitespace-pre-wrap">{comment.text}</p>
      </div>
      {isOwner && (
        <button
          onClick={() => onDelete(comment.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer shrink-0"
        >
          <Icon name="close" size="text-sm" />
        </button>
      )}
    </motion.div>
  )
}

export default function CommentSection({ postId, commentCount = 0 }) {
  const { user, userProfile, isAuthenticated } = useAuth()
  const { comments, loading, sending, error, fetchComments, add, remove } = useComments(postId)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (postId) fetchComments(true)
  }, [postId, fetchComments])

  const previewComments = comments.slice(0, 3)
  const hasMore = commentCount > 3 || comments.length > 3

  const handleAdd = (text) => {
    if (!user || !userProfile) return
    add(text, user.uid, userProfile)
  }

  return (
    <div className="space-y-3">
      {error && (
        <p className="text-sm text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
          Yorumlar şu an yüklenemiyor. Firestore index oluşturuluyor olabilir; birkaç dakika sonra tekrar deneyin.
        </p>
      )}
      {previewComments.length > 0 && (
        <div className="space-y-2.5">
          {previewComments.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              onDelete={remove}
              isOwner={user?.uid === c.userId}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <button
          onClick={() => setShowAll(true)}
          className="text-xs text-primary font-semibold hover:underline cursor-pointer"
        >
          Tüm yorumları gör ({commentCount || comments.length})
        </button>
      )}

      {isAuthenticated && (
        <CommentInput onSubmit={handleAdd} sending={sending} disabled={!isAuthenticated} />
      )}

      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title="Yorumlar">
        <div className="space-y-3 max-h-[60vh] overflow-y-auto px-1">
          <AnimatePresence>
            {comments.map((c) => (
              <CommentItem
                key={c.id}
                comment={c}
                onDelete={remove}
                isOwner={user?.uid === c.userId}
              />
            ))}
          </AnimatePresence>
          {comments.length === 0 && !loading && (
            <p className="text-center text-sm text-slate-400 py-8">Henüz yorum yok.</p>
          )}
        </div>
        {isAuthenticated && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <CommentInput onSubmit={handleAdd} sending={sending} disabled={!isAuthenticated} />
          </div>
        )}
      </Modal>
    </div>
  )
}
