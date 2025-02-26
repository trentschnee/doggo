import { QueryClient } from '@tanstack/react-query';
interface AxiosErrorObject extends Error {
  isAxiosError?: boolean;
  response?: {
    status?: number;
  };
}
const createRetryHandler = (handleUnauthorized: () => void, maxRetries = 2) => {
  return (count: number, error: Error) => {
    const axiosError = error as AxiosErrorObject

    if (axiosError.isAxiosError && axiosError.response?.status === 401) {
      handleUnauthorized();
      return false
    }
    return count < maxRetries;
  }


}
export const createQueryClient = (handleUnauthorized: () => void) => new QueryClient({
  defaultOptions: {
    queries: {
      retry: createRetryHandler(handleUnauthorized), // Retry failed requests twice
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      refetchOnWindowFocus: false, // Disable refetch on window focus
    },
    mutations: {
      retry: createRetryHandler(handleUnauthorized, 1), // Retry failed mutations once
    },
  },
});