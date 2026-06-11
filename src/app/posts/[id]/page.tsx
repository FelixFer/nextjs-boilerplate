import type { Metadata } from 'next';

import { PostDetail } from '@/features/posts/components/post-detail';

export async function generateMetadata(
  props: PageProps<'/posts/[id]'>,
): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Post ${id}` };
}

export default async function PostDetailPage(props: PageProps<'/posts/[id]'>) {
  const { id } = await props.params;
  return <PostDetail id={id} />;
}
