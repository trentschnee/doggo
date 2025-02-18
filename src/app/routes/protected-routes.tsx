import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "../../components/guards/protected-route";
import { DoggosPage } from "../pages/doggos";


export const protectedRoutes = [{
  element: <ProtectedRoute />,
  children: [{ path: '/', element: <Navigate to="/doggos" /> },
  { path: '/doggos', element: <DoggosPage /> },]
}]