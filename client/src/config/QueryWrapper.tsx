'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

// Create the QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// QueryWrapper component using the exported queryClient
export default function QueryWrapper({ children }: { children: ReactNode }) {
  // Ensure the queryClient is not recreated on every render
  const [client] = useState(() => queryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
