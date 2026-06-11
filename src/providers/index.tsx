import type { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { QueryProvider } from '@/providers/query-provider';
import { ThemeProvider } from '@/providers/theme-provider';

/** Single wrapper for all app-level providers, used once in the root layout. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster richColors position='top-right' />
      </QueryProvider>
    </ThemeProvider>
  );
}
