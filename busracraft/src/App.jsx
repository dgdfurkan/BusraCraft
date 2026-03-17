import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import AppLayout from './components/layout/AppLayout'
import YarnBallSpinner from './components/ui/animations/YarnBallSpinner'
import { useRecipes } from './hooks/useRecipes'
import { useCategories } from './hooks/useCategories'
import { useLists } from './hooks/useLists'
import { useImageUpload } from './hooks/useImageUpload'

const HomePage = lazy(() => import('./pages/HomePage'))
const RecipesPage = lazy(() => import('./pages/RecipesPage'))
const RecipeDetailPage = lazy(() => import('./pages/RecipeDetailPage'))
const AddRecipePage = lazy(() => import('./pages/AddRecipePage'))
const EditRecipePage = lazy(() => import('./pages/EditRecipePage'))
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'))
const ListsPage = lazy(() => import('./pages/ListsPage'))
const ListDetailPage = lazy(() => import('./pages/ListDetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

function AppRoutes() {
  const { recipes, loading, getRecipe, addRecipe, updateRecipe, deleteRecipe } = useRecipes()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { lists, getList, addList, updateList, deleteList, addRecipeToList, removeRecipeFromList } = useLists()
  const { uploadMultiple } = useImageUpload()

  return (
    <AppLayout>
      <Suspense fallback={<YarnBallSpinner />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage recipes={recipes} loading={loading} />}
          />
          <Route
            path="/tarifler"
            element={<RecipesPage recipes={recipes} loading={loading} categories={categories} />}
          />
          <Route
            path="/tarif/:id"
            element={
              <RecipeDetailPage
                getRecipe={getRecipe}
                deleteRecipe={deleteRecipe}
                lists={lists}
                addRecipeToList={addRecipeToList}
              />
            }
          />
          <Route
            path="/tarif-ekle"
            element={
              <AddRecipePage
                categories={categories}
                addRecipe={addRecipe}
                uploadImages={uploadMultiple}
              />
            }
          />
          <Route
            path="/tarif-duzenle/:id"
            element={
              <EditRecipePage
                categories={categories}
                getRecipe={getRecipe}
                updateRecipe={updateRecipe}
                uploadImages={uploadMultiple}
              />
            }
          />
          <Route
            path="/kategoriler"
            element={
              <CategoriesPage
                categories={categories}
                addCategory={addCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
              />
            }
          />
          <Route
            path="/listeler"
            element={
              <ListsPage
                lists={lists}
                addList={addList}
                updateList={updateList}
                deleteList={deleteList}
              />
            }
          />
          <Route
            path="/liste/:id"
            element={
              <ListDetailPage
                getList={getList}
                updateList={updateList}
                deleteList={deleteList}
                removeRecipeFromList={removeRecipeFromList}
                recipes={recipes}
              />
            }
          />
          <Route
            path="/arama"
            element={<SearchPage recipes={recipes} categories={categories} />}
          />
          <Route path="/ayarlar" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
