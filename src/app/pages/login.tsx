import { LoginForm } from "../../features/auth/components/login-form"

export const LoginPage: React.FC = () => {
  return (<main>

    <div className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  </main>)
}