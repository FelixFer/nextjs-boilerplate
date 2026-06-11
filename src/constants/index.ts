import { env } from '@/lib/env';

export const APP_NAME = 'Next.js Boilerplate';

/** Public site URL, used for metadata, sitemap, and robots. */
export const APP_URL = env.NEXT_PUBLIC_APP_URL;

/**
 * Centralized TanStack Query keys. Always reference these instead of inline
 * arrays so invalidation stays consistent across features.
 */
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    detail: (id: number | string) => ['posts', id] as const,
  },
} as const;
