import { Stack } from 'expo-router';

import { CONTENT_MAX_WIDTH } from '@/hooks/use-wide-layout';

// Keeps the settings root under any deep link (e.g. the Parking tab's pass button) so
// the back button always has somewhere to go.
export const unstable_settings = { anchor: 'index' };

export default function SettingsLayout() {
  // 'minimal' = chevron-only back button (no previous-screen title) on every settings page.
  // The pages keep a readable width on a wide window; a phone is narrower anyway.
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { width: '100%', maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center' },
      }}
    />
  );
}
