/**
 * CustomTabBar - Integração do TabBar do Design System com React Navigation
 */

import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabBar, TabBarItem } from '@design-system/components/TabBar';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // Mapeia as rotas para o formato esperado pelo TabBar
  const items: TabBarItem[] = state.routes.map((route) => {
    const { options } = descriptors[route.key];

    // Obtém o label e ícone das opções da rota
    const label =
      options.tabBarLabel !== undefined
        ? String(options.tabBarLabel)
        : options.title !== undefined
          ? options.title
          : route.name;

    // Define ícones padrão baseado no nome da rota
    const iconMap: Record<string, { icon: string; family?: 'MaterialIcons' | 'Feather' }> = {
      Home: { icon: 'home' },
      Search: { icon: 'search' },
      Cart: { icon: 'shopping-cart' },
      Favorites: { icon: 'favorite' },
      Profile: { icon: 'person' },
    };

    const iconConfig = iconMap[route.name] || { icon: 'circle' };

    return {
      key: route.key,
      label,
      icon: iconConfig.icon,
      iconFamily: iconConfig.family,
      // Você pode adicionar badge aqui baseado em algum estado global
      // badge: route.name === 'Cart' ? cartItemsCount : undefined,
    };
  });

  const activeKey = state.routes[state.index].key;

  const handleTabPress = (key: string) => {
    const route = state.routes.find((r) => r.key === key);
    if (!route) return;

    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return <TabBar items={items} activeKey={activeKey} onTabPress={handleTabPress} />;
}
