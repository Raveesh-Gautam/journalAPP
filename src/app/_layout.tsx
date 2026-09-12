import { Stack } from 'expo-router';
import { EntriesProvider } from '@/context/EntriesContext';

export default function RootLayout() {
  return (
    <EntriesProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </EntriesProvider>

  );
}