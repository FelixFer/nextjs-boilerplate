import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url('NEXT_PUBLIC_API_URL must be a valid URL'),
  NEXT_PUBLIC_APP_URL: z
    .url('NEXT_PUBLIC_APP_URL must be a valid URL')
    .default('http://localhost:3000'),
});

// Next.js inlines NEXT_PUBLIC_* values only when accessed as static property
// references, so each variable must be listed literally here.
const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.message}`)
    .join('\n');
  throw new Error(
    `Invalid environment variables:\n${issues}\n\n` +
      'Copy .env.example to .env.local and fill in the values, then restart the dev server.',
  );
}

/** Validated, type-safe environment variables. */
export const env = parsed.data;
