import type { Metadata } from 'next';

import { APP_NAME } from '@/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'What this boilerplate includes and why.',
};

export default function AboutPage() {
  return (
    <article className='prose-sm mx-auto flex max-w-2xl flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>About {APP_NAME}</h1>
      <p className='text-muted-foreground'>
        This boilerplate is intentionally small. It ships the plumbing every app
        needs — an HTTP client, server-state management, validated forms,
        theming, linting, and formatting — and nothing else.
      </p>
      <p className='text-muted-foreground'>
        Each pattern has one working example: the posts feature demonstrates
        queries, mutations, and cache invalidation against a real API, and the
        settings page shows form controls that need Controller instead of
        register. Copy the pattern, rename the feature, and delete the demos
        when you no longer need them.
      </p>
      <p className='text-muted-foreground'>
        Authentication, databases, and global state stores are deliberately
        excluded — the README links to setup guides for each so you can add them
        without restructuring.
      </p>
    </article>
  );
}
