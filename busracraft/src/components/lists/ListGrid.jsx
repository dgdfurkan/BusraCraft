import ListCard from './ListCard'
import EmptyState from '../ui/EmptyState'

export default function ListGrid({ lists, onCreateNew }) {
  if (lists.length === 0) {
    return (
      <EmptyState
        title="Henüz liste oluşturulmamış"
        description="Tariflerini düzenlemek için listeler oluştur!"
        actionLabel="Liste Oluştur"
        onAction={onCreateNew}
        iconName="folder_open"
        actionIcon="add_circle"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list, i) => (
        <ListCard key={list.id} list={list} index={i} />
      ))}
    </div>
  )
}
