import { useState, useEffect } from 'react'
import PhotoGallery from './PhotoGallery'
import RecipeSteps from './RecipeSteps'
import Icon from '../ui/Icon'
import { useAuth } from '../../context/AuthContext'
import { useLikes } from '../../hooks/useLikes'
import { useSaves } from '../../hooks/useSaves'
import { useCollections } from '../../hooks/useCollections'
import LikeButton from '../social/LikeButton'
import SaveButton from '../social/SaveButton'
import CommentSection from '../social/CommentSection'
import SaveModal from '../social/SaveModal'
import { queryDocuments } from '../../utils/firebaseHelpers'

const infoCardConfig = [
  { key: 'brand', path: 'yarnInfo.brand', icon: 'inventory_2', label: 'İP / YÜN' },
  { key: 'color', path: 'yarnInfo.color', icon: 'palette', label: 'RENK' },
  { key: 'thickness', path: 'yarnInfo.thickness', icon: 'straighten', label: 'KALINLIK' },
  { key: 'needleSize', path: 'needleSize', icon: 'hardware', label: 'TIĞ / ŞİŞ NO' },
]

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export default function RecipeDetail({ recipe }) {
  const { user, isAuthenticated } = useAuth()
  const [postId, setPostId] = useState(null)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [showComments, setShowComments] = useState(false)

  useEffect(() => {
    if (!recipe?.isPublic || !recipe?.id) return
    queryDocuments('socialPosts', [
      { field: 'recipeId', op: '==', value: recipe.id },
    ], null, 'desc', 1).then((result) => {
      if (result.docs.length > 0) setPostId(result.docs[0].id)
    }).catch(() => {})
  }, [recipe?.id, recipe?.isPublic])

  const { liked, toggle: toggleLike } = useLikes(postId, user?.uid)
  const { saved, save: savePost } = useSaves(postId, user?.uid)
  const { collections, add: addCollection } = useCollections(user?.uid)

  if (!recipe) return null

  const infoCards = infoCardConfig
    .map((cfg) => ({ ...cfg, value: getNestedValue(recipe, cfg.path) }))
    .filter((c) => c.value)

  const handleSave = async (collectionId) => {
    await savePost(collectionId)
    setSaveModalOpen(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <PhotoGallery
          photos={recipe.photos || []}
          title={recipe.title}
          category={recipe.categoryName || recipe.category}
          difficulty={recipe.difficulty}
        />

        {infoCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoCards.map((card) => (
              <div
                key={card.key}
                className="p-4 rounded-xl bg-white border border-primary/10 shadow-sm flex flex-col gap-2"
              >
                <Icon name={card.icon} size="text-2xl" className="text-primary" />
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                  {card.label}
                </span>
                <span className="font-semibold text-slate-800">{card.value}</span>
              </div>
            ))}
          </div>
        )}

        {recipe.notes && (
          <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800 mb-3">
              <Icon name="description" size="text-xl" className="text-primary" />
              Notlar
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {recipe.notes}
            </p>
          </div>
        )}

        {recipe.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {postId && recipe.isPublic && (
          <div className="bg-white rounded-xl border border-primary/10 shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-5">
              <LikeButton
                liked={liked}
                count={0}
                onToggle={isAuthenticated ? toggleLike : undefined}
                disabled={!isAuthenticated}
              />
              <button
                type="button"
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary transition-colors cursor-pointer"
              >
                <Icon name="chat_bubble_outline" size="text-xl" />
                Yorumlar
              </button>
              <SaveButton
                saved={saved}
                count={0}
                onClick={isAuthenticated ? () => setSaveModalOpen(true) : undefined}
                disabled={!isAuthenticated}
              />
            </div>
            {showComments && (
              <CommentSection postId={postId} commentCount={0} />
            )}
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden sticky top-4">
          <div className="bg-primary p-4 flex items-center gap-2 text-white">
            <Icon name="format_list_numbered" size="text-xl" />
            <h3 className="font-bold text-base">Yapılış Aşamaları</h3>
          </div>
          <RecipeSteps steps={recipe.steps || []} />
        </div>
      </div>

      <SaveModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        collections={collections}
        onSave={handleSave}
        onCreateCollection={addCollection}
      />
    </div>
  )
}
