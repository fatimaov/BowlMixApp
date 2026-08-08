import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoute() {
  const location = useLocation()
  const token = window.localStorage.getItem('bowlmix_user_token')

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
