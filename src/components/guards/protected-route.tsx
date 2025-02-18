import { useAuth } from "@/features/auth/hooks/use-auth";
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  ///check if authed
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}