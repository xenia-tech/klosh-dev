import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // TEMPORARY: Bypass authentication for development
  return <>{children}</>
  
  /* Original authentication code - commented out temporarily
  const { user, loading } = useAuth()

  if (loading) {
    return null // Or a loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
  */
}
