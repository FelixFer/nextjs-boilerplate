'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePosts } from '@/features/posts/hooks/use-posts';
import { getApiErrorMessage } from '@/lib/errors/api-error';

export function PostList() {
  const { data, isPending, isError, error, refetch } = usePosts();

  if (isPending) {
    return (
      <div className='space-y-3'>
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className='h-20 w-full' />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Failed to load posts</CardTitle>
          <CardDescription>{getApiErrorMessage(error)}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant='outline' onClick={() => refetch()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-3'>
      {data.slice(0, 5).map((post) => (
        <Link
          key={post.id}
          href={`/posts/${post.id}`}
          className='focus-visible:ring-ring block rounded-xl outline-none focus-visible:ring-2'
        >
          <Card className='hover:bg-muted/50 transition-colors'>
            <CardHeader>
              <CardTitle className='line-clamp-1'>{post.title}</CardTitle>
              <CardDescription className='line-clamp-2'>
                {post.body}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
