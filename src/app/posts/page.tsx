import type { Metadata } from 'next';

import { CreatePostForm } from '@/features/posts/components/create-post-form';
import { PostList } from '@/features/posts/components/post-list';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'TanStack Query and React Hook Form demo.',
};

export default function PostsPage() {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Posts</h1>
        <p className='text-muted-foreground'>
          Data fetched with useQuery; the form runs a useMutation that
          invalidates the list on success.
        </p>
      </div>
      <div className='grid gap-6 md:grid-cols-2'>
        <CreatePostForm />
        <PostList />
      </div>
    </div>
  );
}
