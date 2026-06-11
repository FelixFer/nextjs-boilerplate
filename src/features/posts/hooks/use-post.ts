'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { getPost } from '@/features/posts/api';
import { ApiError } from '@/lib/errors/api-error';

/** Fetches a single post. 404s are not retried so notFound() fires fast. */
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => getPost(id),
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 404) {
        return false;
      }
      return failureCount < 1;
    },
  });
}
