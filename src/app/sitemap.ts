import type { MetadataRoute } from 'next';

import { APP_URL } from '@/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/posts', '/settings', '/about'].map((path) => ({
    url: `${APP_URL}${path}`,
    lastModified: new Date(),
  }));
}
