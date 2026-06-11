'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { settingsSchema, type SettingsInput } from '@/schemas/settings';

const languages = [
  { value: 'en', label: 'English' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'ja', label: 'Japanese' },
] as const;

export function SettingsForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { displayName: '', language: 'en', marketingEmails: false },
  });

  function onSubmit(values: SettingsInput) {
    // No settings endpoint on the demo API — wire this to a useMutation
    // (see use-create-post.ts) when you have a real backend.
    toast.success(`Settings saved for ${values.displayName}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile settings</CardTitle>
        <CardDescription>
          Radix-based controls (Select, Switch) are not native inputs, so they
          use Controller instead of register.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.displayName}>
              <FieldLabel htmlFor='displayName'>Display name</FieldLabel>
              <Input
                id='displayName'
                placeholder='Jane Doe'
                aria-invalid={!!errors.displayName}
                {...register('displayName')}
              />
              <FieldError errors={[errors.displayName]} />
            </Field>

            <Field data-invalid={!!errors.language}>
              <FieldLabel htmlFor='language'>Language</FieldLabel>
              <Controller
                control={control}
                name='language'
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id='language'
                      className='w-full'
                      aria-invalid={!!errors.language}
                    >
                      <SelectValue placeholder='Select a language' />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.language]} />
            </Field>

            <Field orientation='horizontal'>
              <FieldContent>
                <FieldLabel htmlFor='marketingEmails'>
                  Marketing emails
                </FieldLabel>
                <FieldDescription>
                  Receive occasional product updates.
                </FieldDescription>
              </FieldContent>
              <Controller
                control={control}
                name='marketingEmails'
                render={({ field }) => (
                  <Switch
                    id='marketingEmails'
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Button type='submit'>Save settings</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
