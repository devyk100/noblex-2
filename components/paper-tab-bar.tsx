import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function PaperTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={{ bottom }}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
        Haptics.selectionAsync();
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        let iconName: string;
        switch (route.name) {
          case 'index':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'experientia':
            iconName = focused ? 'send' : 'send-outline';
            break;
          case 'buzz':
            iconName = focused ? 'bullhorn' : 'bullhorn-outline';
            break;
          case 'networking':
            iconName = focused ? 'account-multiple' : 'account-multiple-outline';
            break;
          case 'profile':
            iconName = focused ? 'account' : 'account-outline';
            break;
          default:
            iconName = focused ? 'help-circle' : 'help-circle-outline';
        }
        return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        return options.tabBarLabel !== undefined
          ? String(options.tabBarLabel)
          : options.title !== undefined
          ? String(options.title)
          : route.name;
      }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      style={{ backgroundColor: theme.colors.background }}
    />
  );
}
