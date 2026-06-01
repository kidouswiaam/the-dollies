import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { StoreProvider } from './contexts/StoreContext'
import ProtectedRoute from './components/ProtectedRoute'
import StoreLayout from './layouts/StoreLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import ProductForm from './pages/admin/ProductForm'
import Promotions from './pages/admin/Promotions'
import Settings from './pages/admin/Settings'
import BackToTop from './components/BackToTop'
import SupabaseSetupNotice from './components/SupabaseSetupNotice'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StoreProvider>
          <BrowserRouter>
            <SupabaseSetupNotice />
            <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
            <BackToTop />
            <Routes>
              <Route element={<StoreLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetail />} />
              </Route>

              <Route path="/admin/login" element={<Login />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/:id/edit" element={<ProductForm />} />
                <Route path="promotions" element={<Promotions />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
