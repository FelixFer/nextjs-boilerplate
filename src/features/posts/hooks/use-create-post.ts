'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { queryKeys } from '@/constants';
import { createPost } from '@/features/posts/api';
import { getApiErrorMessage } from '@/lib/errors/api-error';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('Post created');
      // Mark the list as stale so any mounted usePosts() refetches.
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
