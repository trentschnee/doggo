import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../api/login";
import { logout } from "../api/logout";
const AUTH_QUERY_KEY = ['auth']

export function useAuth() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [params] = useSearchParams();
  const isAuthenticated = useMemo(() => {
    return queryClient.getQueryData(AUTH_QUERY_KEY) ?? false
  }, [queryClient])

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, true);
      const redirectTo = params.get('redirect') || '/doggos'
      navigate(redirectTo)
    },
  });
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, false);
      queryClient.clear();
      navigate('/login')

    }
  })

  return {
    isAuthenticated,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout: logoutMutation.mutate,
  }
}