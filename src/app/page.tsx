import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/constants';

const features = [
  {
    title: 'API layer',
    description:
      'Centralized Axios client with typed errors and an endpoint map in src/lib/api.',
    href: '/posts',
  },
  {
    title: 'TanStack Query',
    description:
      'useQuery, useMutation, and cache invalidation patterns in the posts feature.',
    href: '/posts',
  },
  {
    title: 'Forms with RHF + Zod',
    description:
      'Schema-validated forms: text fields on /posts, select and switch controls on /settings.',
    href: '/settings',
  },
  {
    title: 'Theming',
    description:
      'Light, dark, and system themes via next-themes — try the toggle in the header.',
    href: '/about',
  },
] as const;

export default function HomePage() {
  return (
    <div className='flex flex-col gap-12 py-8'>
      <section className='flex flex-col items-center gap-4 text-center'>
        <h1 className='text-4xl font-bold tracking-tight'>{APP_NAME}</h1>
        <p className='text-muted-foreground max-w-xl text-balance'>
          A lightweight, production-ready starting point with TypeScript,
          Tailwind CSS, shadcn/ui, TanStack Query, and React Hook Form — no
          auth, no database, easy to extend.
        </p>
        <div className='flex gap-3'>
          <Button asChild size='lg'>
            <Link href='/posts'>See the demo</Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/about'>Learn more</Link>
          </Button>
        </div>
      </section>

      <section aria-label='Features' className='grid gap-4 sm:grid-cols-2'>
        {features.map((feature) => (
          <Link
            key={feature.title}
            href={feature.href}
            className='focus-visible:ring-ring rounded-xl outline-none focus-visible:ring-2'
          >
            <Card className='hover:bg-muted/50 h-full transition-colors'>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
