import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import merge from 'deepmerge';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const CombinedDefaultTheme = merge(MD3LightTheme, {
    colors: {
      primary: Colors.light.violet,
      accent: Colors.light.purple,
      background: Colors.light.background,
      text: Colors.light.text,
      // Add other colors as needed
    },
  });

  const CombinedDarkTheme = merge(MD3DarkTheme, {
    colors: {
      primary: Colors.dark.violet,
      accent: Colors.dark.purple,
      background: Colors.dark.background,
      text: Colors.dark.text,
      // Add other colors as needed
    },
  });

  const paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
