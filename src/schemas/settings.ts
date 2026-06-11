import { z } from 'zod';

export const settingsSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be at most 50 characters'),
  language: z.enum(['en', 'id', 'ja'], {
    error: 'Please select a language',
  }),
  marketingEmails: z.boolean(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
