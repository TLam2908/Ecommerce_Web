'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { ReactNode } from 'react';

export default function QueryWrapper({ children }: { children: ReactNode }) {
  // Tạo QueryClient và đảm bảo không tạo lại nó mỗi lần render
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
