'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreatePost } from '@/features/posts/hooks/use-create-post';
import { createPostSchema, type CreatePostInput } from '@/schemas/post';

export function CreatePostForm() {
  const createPost = useCreatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: '', body: '' },
  });

  function onSubmit(values: CreatePostInput) {
    createPost.mutate(values, { onSuccess: () => reset() });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a post</CardTitle>
        <CardDescription>
          React Hook Form + Zod + TanStack Query mutation example.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* noValidate: zod owns validation, skip the browser's built-in UI */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.title}>
              <FieldLabel htmlFor='title'>Title</FieldLabel>
              <Input
                id='title'
                placeholder='My first post'
                aria-invalid={!!errors.title}
                {...register('title')}
              />
              <FieldError errors={[errors.title]} />
            </Field>
            <Field data-invalid={!!errors.body}>
              <FieldLabel htmlFor='body'>Body</FieldLabel>
              <Textarea
                id='body'
                placeholder='Write something...'
                rows={4}
                aria-invalid={!!errors.body}
                {...register('body')}
              />
              <FieldError errors={[errors.body]} />
            </Field>
            <Button type='submit' disabled={createPost.isPending}>
              {createPost.isPending ? 'Creating...' : 'Create post'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
