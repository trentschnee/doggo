import { handleUnauthorized } from "@/features/auth/utils";
import { createQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from "react";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = createQueryClient(handleUnauthorized);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      {children}
    </QueryClientProvider>
  );
};