import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';

import { useCart } from '@contexts/CartContext/useCart';
import { TabBar, TabBarItem } from '@design-system/components/TabBar';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { totalItems } = useCart();

  const items: TabBarItem[] = state.routes.map((route) => {
    const { options } = descriptors[route.key];

    const label =
      options.tabBarLabel !== undefined
        ? String(options.tabBarLabel)
        : options.title !== undefined
          ? options.title
          : route.name;

    const iconMap: Record<string, { icon: string; family?: 'MaterialIcons' | 'Feather' }> = {
      Home: { icon: 'home' },
      Search: { icon: 'search' },
      Cart: { icon: 'shopping-cart' },
      Favorites: { icon: 'favorite' },
      Profile: { icon: 'person' },
      Menu: { icon: 'menu' },
    };

    const iconConfig = iconMap[route.name] || { icon: 'circle' };

    return {
      key: route.key,
      label,
      icon: iconConfig.icon,
      iconFamily: iconConfig.family,
      badge: route.name === 'Cart' ? totalItems : undefined,
    };
  });

  const activeKey = state.routes[state.index].key;

  const handleTabPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;

    const isFocused = state.routes[state.index].key === key;

    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });

    if (isFocused) {
      navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      return;
    }

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return <TabBar items={items} activeKey={activeKey} onTabPress={handleTabPress} />;
}
