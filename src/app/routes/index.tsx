import { AuthLayout } from "../../components/layouts/auth-layout";
import { LoginForm } from "../../features/auth/components/login-form";

export const routes = [
  {
    path: '/auth',
    element: <AuthLayout />, children: [
      { path: 'login', element: <LoginForm /> },
    ]
  },
  // todo:catch all route
]