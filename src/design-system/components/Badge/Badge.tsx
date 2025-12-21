/**
 * Componente Badge
 * Indicador visual para notificações e status
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { BadgeProps } from './Badge.types';
import { getSizeStyles, getVariantStyles, getTextSizeStyles } from './Badge.styles';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
}) => {
  const { theme } = useTheme();

  const badgeStyle = {
    borderRadius: theme.radius.full,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    ...getSizeStyles(size, theme, dot),
    ...getVariantStyles(variant, theme),
  };

  if (dot) {
    return <View style={badgeStyle} />;
  }

  const textStyle = {
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.semibold,
    ...getTextSizeStyles(size, theme),
  };

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};
