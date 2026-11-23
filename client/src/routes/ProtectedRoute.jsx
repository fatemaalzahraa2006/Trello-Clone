
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  // Wait until the saved session has been checked
  if (loading) {
    return <p>Loading...</p>
  }

  // Redirect logged-out users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Allow authenticated users to access the requested page
  return <Outlet />
}

export default ProtectedRoute
