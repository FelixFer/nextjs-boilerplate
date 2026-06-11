'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Logs Core Web Vitals in development. Replace the console call with your
 * analytics provider (e.g. Vercel Analytics, PostHog) to track real users.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    }
  });

  return null;
}
