'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { getPosts } from '@/features/posts/api';

export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: getPosts,
  });
}
