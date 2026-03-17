import RecipeCard from '../recipe/RecipeCard'
import EmptyState from '../ui/EmptyState'
import Icon from '../ui/Icon'

export default function ListDetail({ list, recipes, onRemoveRecipe }) {
  if (!list) return null

  const listRecipes = recipes.filter((r) => (list.recipeIds || []).includes(r.id))

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white rounded-2xl p-6 border border-primary/10 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl shrink-0">
          {list.emoji || '📁'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-text truncate">{list.name}</h2>
          {list.description && (
            <p className="text-sm text-text-secondary mt-1">{list.description}</p>
          )}
          <div className="flex items-center gap-1.5 mt-2 text-text-secondary">
            <Icon name="menu_book" size="text-sm" />
            <span className="text-xs font-medium">{listRecipes.length} tarif</span>
          </div>
        </div>
      </div>

      {listRecipes.length === 0 ? (
        <EmptyState
          title="Bu liste boş"
          description="Tariflerden bu listeye ekleyebilirsiniz."
          iconName="inbox"
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {listRecipes.map((recipe, i) => (
            <div key={recipe.id} className="relative group">
              <RecipeCard recipe={recipe} index={i} />
              {onRemoveRecipe && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveRecipe(list.id, recipe.id)
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg hover:bg-red-600 cursor-pointer"
                >
                  <Icon name="close" size="text-sm" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
