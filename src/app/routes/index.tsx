import { AuthLayout } from "../../components/layouts/auth-layout";
import { LoginForm } from "../../features/auth/components/login-form";

export const routes = [
  {
    path: '/', children: [
      { path: '/doggos', element: <div>doggos</div> },
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />, children: [
      { path: 'login', element: <LoginForm /> },
    ]

  },
  { path: '*', element: <div>404</div> }
  // todo:catch all route
]