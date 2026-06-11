import type { Metadata } from 'next';

import { SettingsForm } from '@/features/settings/components/settings-form';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Form example with Select and Switch controls.',
};

export default function SettingsPage() {
  return (
    <div className='mx-auto flex max-w-xl flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Settings</h1>
        <p className='text-muted-foreground'>
          A second React Hook Form example using Controller for non-native
          controls.
        </p>
      </div>
      <SettingsForm />
    </div>
  );
}
