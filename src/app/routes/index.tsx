import { Navigate } from "react-router-dom";
import { protectedRoutes } from "./protected-routes";
import { unprotectedRoutes } from "./unprotected-routes";

export const routes = [
  ...protectedRoutes,
  ...unprotectedRoutes,
  { path: '*', element: <Navigate to="/login" replace /> }
  // todo:catch all route
]