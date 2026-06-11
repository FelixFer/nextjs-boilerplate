/** Single source of truth for API paths, relative to NEXT_PUBLIC_API_URL. */
export const endpoints = {
  posts: {
    list: '/posts',
    detail: (id: number | string) => `/posts/${id}`,
  },
} as const;
