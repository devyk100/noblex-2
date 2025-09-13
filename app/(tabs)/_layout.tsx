import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          animation: "shift",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync(); // ✅ gives a subtle haptic feedback
          },
        }}

      />
      <Tabs.Screen
        name="experientia"
        options={{
          title: 'Experientia',
          animation: "shift",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync(); // ✅ gives a subtle haptic feedback
          },
        }}

      />
      <Tabs.Screen
        name="buzz"
        options={{
          title: 'Campus Buzz',
          animation: "shift",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="megaphone" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync(); // ✅ gives a subtle haptic feedback
          },
        }}

      />
      <Tabs.Screen
        name="networking"
        options={{
          title: 'Networking',
          animation: "shift",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2" color={color} />,
        }}
        listeners={{
          tabPress: () => {
            Haptics.selectionAsync(); // ✅ gives a subtle haptic feedback
          },
        }}

      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          animation: "shift",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
          
        }}
        listeners={{
          tabPress: () => {
            Haptics.notificationAsync(); // ✅ gives a subtle haptic feedback
          },
        }}
      />
    </Tabs>
  );
}
