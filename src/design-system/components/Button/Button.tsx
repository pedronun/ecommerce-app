/**
 * Componente Button
 * Botão reutilizável com variantes e tamanhos
 */

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { ButtonProps } from './Button.types';
import {
  getSizeStyles,
  getVariantStyles,
  getTextSizeStyles,
  getTextVariantStyles,
  getLoadingColor,
} from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const buttonStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    gap: theme.spacing[2],
    ...getSizeStyles(size, theme),
    ...getVariantStyles(variant, theme),
    ...(fullWidth && { width: '100%' }),
    opacity: disabled ? 0.5 : 1,
  };

  const textStyles = {
    ...getTextSizeStyles(size, theme),
    ...getTextVariantStyles(variant, theme),
  };

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={getLoadingColor(variant, theme)}
          size={size === 'sm' ? 'small' : 'small'}
        />
      ) : (
        <>
          {leftIcon}
          <Text style={textStyles}>{children}</Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
};
