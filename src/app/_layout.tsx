import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Splash screen ko tab tak hold rakho jab tak app load na ho
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Layout load hone par splash screen auto-hide kar do
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      {/* Agar tabs group ho toh: */}
      {/* <Stack.Screen name="(tabs)" /> */}
    </Stack>
  );
}