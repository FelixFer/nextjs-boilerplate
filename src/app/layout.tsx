import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { SiteHeader } from '@/components/common/site-header';
import { WebVitals } from '@/components/common/web-vitals';
import { APP_NAME, APP_URL } from '@/constants';
import { AppProviders } from '@/providers';

import './globals.css';

const fontSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const description =
  'Production-ready Next.js boilerplate with TypeScript, Tailwind CSS, and shadcn/ui.';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description,
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description,
  },
  twitter: {
    card: 'summary',
    title: APP_NAME,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required: next-themes updates the class
    // attribute on <html> before React hydrates.
    <html
      lang='en'
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='flex min-h-full flex-col'>
        <a
          href='#main-content'
          className='focus:bg-background focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm focus:ring-2'
        >
          Skip to main content
        </a>
        <AppProviders>
          <SiteHeader />
          <main
            id='main-content'
            className='mx-auto w-full max-w-4xl flex-1 px-4 py-8'
          >
            {children}
          </main>
          <WebVitals />
        </AppProviders>
      </body>
    </html>
  );
}
