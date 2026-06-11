'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center'>
      <h1 className='text-2xl font-semibold'>Something went wrong</h1>
      <p className='text-muted-foreground max-w-md'>
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
