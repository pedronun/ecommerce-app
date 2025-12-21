/**
 * Componente Card
 * Container para agrupar conteúdo relacionado
 */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { CardProps } from './Card.types';
import { getBaseCardStyles, getVariantStyles } from './Card.styles';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  onPress,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const cardStyle = {
    ...getBaseCardStyles(theme),
    ...getVariantStyles(variant, theme),
  };

  if (onPress) {
    return (
      <TouchableOpacity style={[cardStyle, style]} onPress={onPress} activeOpacity={0.7} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};
