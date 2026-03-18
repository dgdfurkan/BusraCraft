import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import AppLayout from './components/layout/AppLayout'
import YarnBallSpinner from './components/ui/animations/YarnBallSpinner'
import { useRecipes } from './hooks/useRecipes'
import { useCategories } from './hooks/useCategories'
import { useLists } from './hooks/useLists'
import { useImageUpload } from './hooks/useImageUpload'
import { MemberOnlyRoute, ProtectedRoute, GuestOnlyRoute } from './components/auth/ProtectedRoute'

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
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const SocialFeedPage = lazy(() => import('./pages/SocialFeedPage'))
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'))
const CollectionDetailPage = lazy(() => import('./pages/CollectionDetailPage'))

function AppRoutes() {
  const { recipes, loading, getRecipe, addRecipe, updateRecipe, deleteRecipe } = useRecipes()
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories()
  const { lists, getList, addList, updateList, deleteList, addRecipeToList, removeRecipeFromList } = useLists()
  const { uploadMultiple } = useImageUpload()

  return (
    <Routes>
      <Route
        path="/giris"
        element={<GuestOnlyRoute><LoginPage /></GuestOnlyRoute>}
      />
      <Route
        path="/kayit"
        element={<GuestOnlyRoute><RegisterPage /></GuestOnlyRoute>}
      />

      <Route element={<AppLayout />}>
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
          path="/kesfet"
          element={<SocialFeedPage />}
        />
        <Route
          path="/arama"
          element={<SearchPage recipes={recipes} categories={categories} />}
        />
        <Route path="/ayarlar" element={<SettingsPage />} />

        <Route
          path="/tarif-ekle"
          element={
            <MemberOnlyRoute>
              <AddRecipePage
                categories={categories}
                addRecipe={addRecipe}
                uploadImages={uploadMultiple}
              />
            </MemberOnlyRoute>
          }
        />
        <Route
          path="/tarif-duzenle/:id"
          element={
            <MemberOnlyRoute>
              <EditRecipePage
                categories={categories}
                getRecipe={getRecipe}
                updateRecipe={updateRecipe}
                uploadImages={uploadMultiple}
              />
            </MemberOnlyRoute>
          }
        />
        <Route
          path="/kategoriler"
          element={
            <MemberOnlyRoute>
              <CategoriesPage
                categories={categories}
                addCategory={addCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
              />
            </MemberOnlyRoute>
          }
        />
        <Route
          path="/listeler"
          element={
            <MemberOnlyRoute>
              <ListsPage
                lists={lists}
                addList={addList}
                updateList={updateList}
                deleteList={deleteList}
              />
            </MemberOnlyRoute>
          }
        />
        <Route
          path="/liste/:id"
          element={
            <MemberOnlyRoute>
              <ListDetailPage
                getList={getList}
                updateList={updateList}
                deleteList={deleteList}
                removeRecipeFromList={removeRecipeFromList}
                recipes={recipes}
              />
            </MemberOnlyRoute>
          }
        />
        <Route
          path="/koleksiyonlarim"
          element={
            <ProtectedRoute>
              <CollectionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/koleksiyon/:id"
          element={
            <ProtectedRoute>
              <CollectionDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <HashRouter>
            <Suspense fallback={<YarnBallSpinner />}>
              <AppRoutes />
            </Suspense>
          </HashRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
