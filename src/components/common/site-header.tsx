import Link from 'next/link';

import { NavLinks } from '@/components/common/nav-links';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { APP_NAME } from '@/constants';

export function SiteHeader() {
  return (
    <header className='border-b'>
      <div className='mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4'>
        <Link href='/' className='shrink-0 font-semibold'>
          {APP_NAME}
        </Link>
        <div className='flex items-center gap-2'>
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
