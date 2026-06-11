'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const links = [
  { href: '/posts', label: 'Posts' },
  { href: '/settings', label: 'Settings' },
  { href: '/about', label: 'About' },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label='Main navigation' className='flex items-center gap-1'>
      {links.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors',
              isActive
                ? 'text-foreground font-medium'
                : 'text-muted-foreground',
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
