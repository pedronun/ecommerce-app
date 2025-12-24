import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TabBarProps, TabBarItem } from './TabBar.types';
import {
  getContainerStyles,
  getTabItemStyles,
  getActiveIndicatorStyles,
  getIconWrapperStyles,
  getBadgeStyles,
  getBadgeTextStyles,
  getLabelStyles,
} from './TabBar.styles';
import { Icon } from '../Icon';

export const TabBar: React.FC<TabBarProps> = ({
  items,
  activeKey,
  onTabPress,
  showLabels = true,
  activeColor,
  inactiveColor,
  style,
}) => {
  const { theme } = useTheme();

  // Animação para o indicador ativo
  const scaleAnims = React.useRef(
    items.reduce(
      (acc, item) => {
        acc[item.key] = new Animated.Value(item.key === activeKey ? 1 : 0);
        return acc;
      },
      {} as Record<string, Animated.Value>
    )
  ).current;

  // Atualiza animações quando a tab ativa muda
  React.useEffect(() => {
    items.forEach((item) => {
      Animated.spring(scaleAnims[item.key], {
        toValue: item.key === activeKey ? 1 : 0,
        useNativeDriver: false,
        friction: 8,
        tension: 40,
      }).start();
    });
  }, [activeKey, items, scaleAnims]);

  const renderTabItem = (item: TabBarItem) => {
    const isActive = item.key === activeKey;
    const iconColor = isActive
      ? activeColor || theme.colors.primary
      : inactiveColor || theme.colors.text.secondary;

    return (
      <TouchableOpacity
        key={item.key}
        style={getTabItemStyles(theme)}
        onPress={() => onTabPress(item.key)}
        activeOpacity={0.7}
      >
        {/* Indicador de fundo para tab ativa */}
        {isActive && (
          <Animated.View
            style={[
              getActiveIndicatorStyles(theme),
              {
                opacity: scaleAnims[item.key].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.15],
                }),
                transform: [
                  {
                    scale: scaleAnims[item.key].interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        )}

        {/* Ícone e Badge */}
        <View style={getIconWrapperStyles()}>
          <Icon
            family={item.iconFamily || 'MaterialIcons'}
            name={item.icon}
            size={isActive ? 26 : 24}
            color={iconColor}
          />
          {item.badge !== undefined && item.badge > 0 && (
            <View style={getBadgeStyles(theme)}>
              <Text style={getBadgeTextStyles(theme)}>{item.badge > 99 ? '99+' : item.badge}</Text>
            </View>
          )}
        </View>

        {/* Label */}
        {showLabels && (
          <Text style={getLabelStyles(theme, isActive, isActive ? activeColor : inactiveColor)}>
            {item.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[getContainerStyles(theme), style]}>
      {items.map((item) => renderTabItem(item))}
    </View>
  );
};
