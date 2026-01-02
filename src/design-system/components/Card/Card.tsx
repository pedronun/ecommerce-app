import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
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
    const { onBlur, onFocus, ...touchableProps } = props;
    return (
      <TouchableOpacity
        style={[cardStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
        {...touchableProps}
      >
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
