import { apiClient } from '@/lib/api/client';
import { endpoints } from '@/lib/api/endpoints';
import type { CreatePostInput } from '@/schemas/post';
import type { Post } from '@/types';

export async function getPosts(): Promise<Post[]> {
  const { data } = await apiClient.get<Post[]>(endpoints.posts.list);
  return data;
}

export async function getPost(id: number | string): Promise<Post> {
  const { data } = await apiClient.get<Post>(endpoints.posts.detail(id));
  return data;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const { data } = await apiClient.post<Post>(endpoints.posts.list, input);
  return data;
}
