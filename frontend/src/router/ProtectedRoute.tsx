import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingState from '../components/LoadingState'
import { useAuth } from '../context/auth/useAuth'

function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingState aria-label="Checking authentication" />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
