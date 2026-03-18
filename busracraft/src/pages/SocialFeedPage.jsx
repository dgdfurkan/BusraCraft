import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSocialFeed } from '../hooks/useSocialFeed'
import PostCard from '../components/social/PostCard'
import SocialGrid from '../components/social/SocialGrid'
import SocialFilterBar from '../components/social/SocialFilterBar'
import ViewToggle from '../components/social/ViewToggle'
import YarnBallSpinner from '../components/ui/animations/YarnBallSpinner'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

export default function SocialFeedPage({ categories = [] }) {
  const {
    posts, loading, loadingMore, hasMore,
    filters, members, loadMore, updateFilter, resetFilters,
  } = useSocialFeed()

  const [view, setView] = useState(() => localStorage.getItem('social_view') || 'feed')

  useEffect(() => {
    localStorage.setItem('social_view', view)
  }, [view])

  if (loading) return <YarnBallSpinner text="Keşfet yükleniyor..." />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Keşfet</h1>
          <p className="text-sm text-slate-500 mt-0.5">Topluluktan paylaşılan örgü tarifleri</p>
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      <SocialFilterBar
        categories={categories}
        filters={filters}
        members={members}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />

      {posts.length === 0 ? (
        <EmptyState
          title="Henüz paylaşım yok"
          description="Toplulukta henüz kimse tarif paylaşmamış. İlk paylaşan sen ol!"
        />
      ) : view === 'grid' ? (
        <SocialGrid posts={posts} />
      ) : (
        <div className="max-w-2xl mx-auto space-y-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} variant="feed" />
          ))}
        </div>
      )}

      {hasMore && posts.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button
            variant="secondary"
            onClick={loadMore}
            loading={loadingMore}
          >
            <Icon name="expand_more" size="text-lg" />
            Daha Fazla Yükle
          </Button>
        </div>
      )}
    </motion.div>
  )
}
