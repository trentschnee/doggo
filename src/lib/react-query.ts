import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const createRetryHandler = (handleUnauthorized: () => void, maxRetries = 2) => {
  return (count: number, error: Error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
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