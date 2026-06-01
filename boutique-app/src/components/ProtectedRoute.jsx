import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isStaff, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />
  if (!isStaff) return <Navigate to="/admin/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/admin" replace />

  return children
}
