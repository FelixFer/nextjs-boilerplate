# Next.js Boilerplate

Production-ready Next.js App Router boilerplate with TypeScript, Tailwind CSS, and shadcn/ui. Lightweight by design — no auth, no database, no global state library — so it is easy to extend in any direction.

## Stack

| Tool                                                           | Purpose                                |
| -------------------------------------------------------------- | -------------------------------------- |
| [Next.js 16](https://nextjs.org) (App Router, Turbopack)       | Framework                              |
| [TypeScript](https://www.typescriptlang.org)                   | Type safety                            |
| [Tailwind CSS v4](https://tailwindcss.com)                     | Styling                                |
| [shadcn/ui](https://ui.shadcn.com)                             | UI components (`src/components/ui`)    |
| [TanStack Query v5](https://tanstack.com/query)                | Server-state and data fetching         |
| [Axios](https://axios-http.com)                                | HTTP client (`src/lib/api`)            |
| [React Hook Form](https://react-hook-form.com)                 | Forms                                  |
| [Zod](https://zod.dev)                                         | Schema validation (`src/schemas`)      |
| [next-themes](https://github.com/pacocoursey/next-themes)      | Light / dark mode                      |
| [ESLint](https://eslint.org) + [Prettier](https://prettier.io) | Linting and formatting (single quotes) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page demonstrates the full data flow: a `useQuery` post list and a `useMutation` form that invalidates the list after creating a post.

### Environment variables

| Variable              | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of your API, e.g. `https://api.example.com`            |
| `NEXT_PUBLIC_APP_URL` | Public URL of this app (used for metadata, sitemap, and robots) |

For a quick demo, point it at JSONPlaceholder:

```
NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
```

### Scripts

| Script                 | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the dev server             |
| `npm run build`        | Production build                 |
| `npm run start`        | Serve the production build       |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |

## Folder structure

```
src/
├── app/                  Routes, layouts, and route-level UI (loading/error/not-found)
├── components/
│   ├── ui/               shadcn/ui components (generated via the shadcn CLI)
│   └── common/           Shared app components (SiteHeader, ThemeToggle, ...)
├── features/             Feature modules — each owns its api, hooks, and components
│   └── posts/
│       ├── api.ts        API calls for this feature
│       ├── hooks/        Query/mutation hooks (usePosts, useCreatePost)
│       └── components/   Feature UI (PostList, CreatePostForm)
├── hooks/                Generic reusable hooks (useDebounce, ...)
├── lib/
│   ├── api/              Axios client, endpoint map, shared API types
│   ├── utils/            Generic utilities (cn, ...)
│   └── errors/           ApiError class + getApiErrorMessage helper
├── providers/            AppProviders (theme + query), individual providers
├── constants/            App-wide constants and query keys
├── schemas/              Zod schemas shared between forms and API calls
├── types/                Shared TypeScript types
└── assets/               Static assets imported by components
```

The rule of thumb: anything specific to one feature lives in `src/features/<feature>/`; anything shared across features lives in the top-level folders.

## Pages

| Route         | What it demonstrates                                                         |
| ------------- | ---------------------------------------------------------------------------- |
| `/`           | Landing page (static server component)                                       |
| `/posts`      | `useQuery` list + `useMutation` form with cache invalidation                 |
| `/posts/[id]` | Dynamic route with async `params`, per-route `loading.tsx`, and `notFound()` |
| `/settings`   | React Hook Form with `Controller` for Radix Select/Switch controls           |
| `/about`      | Static page with its own `metadata` export                                   |

## How it works

### API layer (`src/lib/api`)

- `client.ts` exports a configured Axios instance (`apiClient`). The base URL comes from `NEXT_PUBLIC_API_URL`, and a response interceptor converts every failure into a typed `ApiError`.
- `endpoints.ts` is the single source of truth for API paths.
- `types.ts` holds generic API shapes (`ApiResponse<T>`, `PaginatedResponse<T>`, ...).
- `lib/errors/api-error.ts` provides `getApiErrorMessage(error)` — use it anywhere you need a safe, human-readable message (toasts, error states).

Adding an endpoint:

```ts
// src/lib/api/endpoints.ts
export const endpoints = {
  users: {
    list: '/users',
    detail: (id: number | string) => `/users/${id}`,
  },
} as const;
```

### Data fetching (TanStack Query)

`QueryProvider` (in `src/providers/query-provider.tsx`) configures a `QueryClient` with sensible defaults and mounts the devtools in development. Query keys are centralized in `src/constants`.

The posts feature shows the three core patterns:

- **useQuery** — `src/features/posts/hooks/use-posts.ts`
- **useMutation** — `src/features/posts/hooks/use-create-post.ts`
- **Invalidation after mutation** — `onSuccess` calls `queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })`, which refetches the list automatically.

### Forms (React Hook Form + Zod)

Schemas live in `src/schemas` and are shared between the form resolver and the API call, so the payload type is inferred once (`z.infer`). See `create-post-form.tsx` for the full pattern: `useForm` + `zodResolver` + shadcn `Field` components for labels and error messages.

### Theming

`ThemeProvider` wraps `next-themes` with `attribute='class'` and system-theme support. `ThemeToggle` (in `components/common`) switches between light, dark, and system. Note the `suppressHydrationWarning` on `<html>` in the root layout — it is required by next-themes.

### Providers

`src/providers/index.tsx` exports a single `AppProviders` component (theme + query + toaster) used once in `app/layout.tsx`. Add future providers there.

### Server vs client components

Everything is a server component by default. `'use client'` is only used where needed: providers, the theme toggle, query/mutation hooks, form and list components, and `app/error.tsx`.

### Route-level UI

- `app/loading.tsx` — skeleton shown while a route segment loads (`posts/[id]/loading.tsx` shows the per-route variant)
- `app/error.tsx` — error boundary with a retry button (`reset()`)
- `app/not-found.tsx` — 404 page (also triggered programmatically via `notFound()` in `post-detail.tsx`)

## Performance, accessibility, and SEO

The four Lighthouse categories are covered out of the box:

- **Performance** — Turbopack, React Compiler (`reactCompiler: true`), `next/font` with Geist, and a `WebVitals` component (`components/common/web-vitals.tsx`) using `useReportWebVitals`; swap its `console.log` for your analytics provider.
- **Accessibility** — skip-to-content link in the root layout, `aria-current` on active nav links, labelled form controls, and `eslint-plugin-jsx-a11y` (recommended rules) wired into ESLint so violations fail `npm run lint`.
- **Best practices** — security headers in `next.config.ts` (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`) and `poweredByHeader: false`.
- **SEO** — `metadataBase` + Open Graph/Twitter defaults in the root layout, per-page `metadata` exports, and `app/sitemap.ts` / `app/robots.ts` (served at `/sitemap.xml` and `/robots.txt`).

To verify, run a production build (`npm run build && npm run start`) and audit any page with Chrome DevTools → Lighthouse.

## How do I…?

Step-by-step guides for everyday tasks. Each one points to a file in this repo that already does the same thing, so you always have a working example to copy from.

### …add a new page?

In the App Router, every folder inside `src/app/` with a `page.tsx` file becomes a URL automatically. To create a page at `/contact`:

1. Create the file `src/app/contact/page.tsx`.
2. Paste this in:

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold'>Contact</h1>
      <p className='text-muted-foreground'>Get in touch with us.</p>
    </div>
  );
}
```

3. Open [http://localhost:3000/contact](http://localhost:3000/contact) — it just works, no registration or routing config needed.
4. Optional: add it to the navigation bar by adding one line to the `links` array in `src/components/common/nav-links.tsx`.

Working example: `src/app/about/page.tsx`.

### …add a page with a URL parameter (like `/products/42`)?

Put the changing part of the URL in square brackets in the folder name: `src/app/products/[id]/page.tsx`.

```tsx
export default async function ProductPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params;
  return <h1>Product {id}</h1>;
}
```

`params` is a Promise in Next.js 16, so the component is `async` and you `await` it. Working example: `src/app/posts/[id]/page.tsx`.

### …add my own component?

1. Decide where it lives:
   - Used by one feature only → `src/features/<feature>/components/`
   - Shared across pages → `src/components/common/`
   - (`src/components/ui/` is reserved for shadcn-generated components — don't put your own there.)
2. Name the file in kebab-case, e.g. `price-tag.tsx`:

```tsx
export function PriceTag({ amount }: { amount: number }) {
  return <span className='font-mono text-sm'>${amount.toFixed(2)}</span>;
}
```

3. Import it where you need it: `import { PriceTag } from '@/components/common/price-tag';`

**When do I need `'use client'` at the top of the file?** Only when the component uses interactivity: `useState`, `useEffect`, event handlers like `onClick`, or hooks from libraries (TanStack Query, React Hook Form, next-themes). If it only displays things, leave it out — it stays a server component (rendered on the server, ships less JavaScript). Compare `site-header.tsx` (no directive) with `theme-toggle.tsx` (`'use client'` because it handles clicks).

### …add a ready-made UI component (button, dialog, table…)?

shadcn/ui components are copied into your project, not installed as a package:

```bash
npx shadcn@latest add dialog
```

The file appears in `src/components/ui/dialog.tsx` and is yours to edit. Then:

```tsx
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components).

### …fetch data from my API?

Three small steps, using the posts feature as the template:

1. Add the path in `src/lib/api/endpoints.ts`:

```ts
products: {
  list: '/products',
},
```

2. Create `src/features/products/api.ts` with a function that calls it:

```ts
import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';

export async function getProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(endpoints.products.list);
  return data;
}
```

3. Create a hook `src/features/products/hooks/use-products.ts` and add a query key to `src/constants/index.ts`:

```ts
'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { getProducts } from '@/features/products/api';

export function useProducts() {
  return useQuery({ queryKey: queryKeys.products.all, queryFn: getProducts });
}
```

In a component (`'use client'`), call `const { data, isPending, isError } = useProducts();` and render the three states. Working example: `src/features/posts/hooks/use-posts.ts` + `src/features/posts/components/post-list.tsx`.

### …send data (create, update, delete)?

Use a mutation. The pattern: send the request, then tell TanStack Query the cached list is outdated so it refetches automatically:

```ts
const queryClient = useQueryClient();

return useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
    toast.success('Product created');
    queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
  },
  onError: (error) => toast.error(getApiErrorMessage(error)),
});
```

Working example: `src/features/posts/hooks/use-create-post.ts`.

### …add a form with validation?

1. Describe the fields and rules in a Zod schema, in `src/schemas/`:

```ts
import { z } from 'zod';

export const contactSchema = z.object({
  email: z.email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

2. In a `'use client'` component, connect it to React Hook Form with `useForm({ resolver: zodResolver(contactSchema) })` and render the inputs with the `Field` components.

Working examples: `src/features/posts/components/create-post-form.tsx` (text inputs, uses `register`) and `src/features/settings/components/settings-form.tsx` (select and switch, which need `Controller` instead of `register` because they are not native HTML inputs).

### …add an environment variable?

1. Add it to `.env.example` (empty, committed to git — documents that it exists) and `.env.local` (real value, ignored by git):

```
NEXT_PUBLIC_ANALYTICS_ID=abc123
```

2. Read it with `process.env.NEXT_PUBLIC_ANALYTICS_ID`.
3. Restart the dev server — env vars are read once at startup.

The `NEXT_PUBLIC_` prefix means the value is embedded in the browser bundle, visible to anyone. Use it for public config (URLs, IDs). Secrets (API keys, passwords) must NOT have the prefix and can only be read in server code.

### …change the colors or theme?

All colors are CSS variables in `src/app/globals.css`: the `:root` block is light mode, the `.dark` block is dark mode. Change `--primary`, `--background`, etc. there and every component updates, because shadcn components reference these variables. Tip: [ui.shadcn.com/themes](https://ui.shadcn.com/themes) generates ready-made palettes you can paste in.

### …show a toast notification?

```ts
import { toast } from 'sonner';

toast.success('Saved!');
toast.error('Something went wrong');
toast.info('Heads up');
```

Works anywhere in client code — the `<Toaster />` is already mounted in `src/providers/index.tsx`.

### …add a whole new feature (the big picture)?

1. Create `src/features/<name>/` with `api.ts`, `hooks/`, and `components/` (copy the shape of `src/features/posts/`).
2. Add its endpoints to `src/lib/api/endpoints.ts` and query keys to `src/constants/index.ts`.
3. Add a Zod schema to `src/schemas/` if it has forms.
4. Create a page under `src/app/<name>/` that composes the feature's components.

## Intentionally excluded

To keep the boilerplate lightweight, the following are not included. All of them can be layered on without restructuring — here is where to start for each:

**Authentication — [Auth.js (NextAuth v5)](https://authjs.dev/getting-started/installation?framework=Next.js)**

```bash
npm install next-auth@beta
```

Add `src/auth.ts` with your providers, an `app/api/auth/[...nextauth]/route.ts` handler, and wrap protected pages with the `auth()` helper. Their App Router guide covers it end to end.

**Database — [Prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite) or [Drizzle](https://orm.drizzle.team/docs/get-started)**

```bash
npm install prisma -D && npx prisma init    # Prisma
npm install drizzle-orm && npm i -D drizzle-kit    # Drizzle
```

Keep the client instance in `src/lib/db.ts` and call it only from server components, route handlers, or server actions — never from `'use client'` files.

**Global client state — [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) or [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)**

Most "global state" here is already covered by TanStack Query (server state) and React context (theme). Reach for Zustand only for genuinely client-only shared state (e.g. a multi-step wizard); put stores in `src/stores/`.

**Docker — [Next.js self-hosting guide](https://nextjs.org/docs/app/guides/self-hosting#docker-image)**

Add `output: 'standalone'` to `next.config.ts`, then copy the official [`Dockerfile` example](https://github.com/vercel/next.js/tree/canary/examples/with-docker). Not needed when deploying to Vercel or Netlify — they build from source.
