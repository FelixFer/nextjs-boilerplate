'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePost } from '@/features/posts/hooks/use-post';
import { ApiError, getApiErrorMessage } from '@/lib/errors/api-error';

export function PostDetail({ id }: { id: string }) {
  const { data, isPending, isError, error, refetch } = usePost(id);

  if (isPending) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-2/3' />
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  if (isError) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>Failed to load post</CardTitle>
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
    <article className='flex flex-col gap-6'>
      <Button asChild variant='ghost' className='w-fit'>
        <Link href='/posts'>
          <ArrowLeftIcon className='size-4' />
          Back to posts
        </Link>
      </Button>
      <div className='flex flex-col gap-2'>
        <p className='text-muted-foreground text-sm'>
          Post #{data.id} by user {data.userId}
        </p>
        <h1 className='text-2xl font-semibold'>{data.title}</h1>
      </div>
      <p className='text-muted-foreground leading-relaxed'>{data.body}</p>
    </article>
  );
}
