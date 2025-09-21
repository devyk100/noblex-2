import { PaperTabBar } from '@/components/paper-tab-bar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => <PaperTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="experientia"
        options={{
          title: 'Experientia',
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="buzz"
        options={{
          title: 'Campus Buzz',
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="networking"
        options={{
          title: 'Networking',
          animation: "shift",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          animation: "shift",
        }}
      />
    </Tabs>
  );
}
