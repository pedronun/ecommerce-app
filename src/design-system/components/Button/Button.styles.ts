import { ViewStyle, TextStyle } from 'react-native';
import { ButtonVariant, ButtonSize } from './Button.types';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
  };
  spacing: Record<number, number>;
  radius: {
    md: number;
  };
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, string | number>;
    lineHeight: Record<string, number>;
  };
}

export const getSizeStyles = (size: ButtonSize, theme: Theme): ViewStyle => {
  const sizes: Record<ButtonSize, ViewStyle> = {
    sm: {
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
      minHeight: 36,
    },
    md: {
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[4],
      minHeight: 44,
    },
    lg: {
      paddingVertical: theme.spacing[4],
      paddingHorizontal: theme.spacing[6],
      minHeight: 52,
    },
  };
  return sizes[size];
};

export const getVariantStyles = (variant: ButtonVariant, theme: Theme): ViewStyle => {
  const variants: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: theme.colors.error,
    },
  };
  return variants[variant];
};

export const getTextSizeStyles = (size: ButtonSize, theme: Theme): TextStyle => {
  const { fontSize } = theme.typography;
  const sizes: Record<ButtonSize, TextStyle> = {
    sm: {
      fontSize: fontSize.sm,
    },
    md: {
      fontSize: fontSize.base,
    },
    lg: {
      fontSize: fontSize.lg,
    },
  };
  return {
    ...sizes[size],
    fontWeight: '600',
  };
};

export const getTextVariantStyles = (variant: ButtonVariant, theme: Theme): TextStyle => {
  const variants: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: '#FFFFFF',
    },
    secondary: {
      color: '#FFFFFF',
    },
    outline: {
      color: theme.colors.primary,
    },
    ghost: {
      color: theme.colors.primary,
    },
    danger: {
      color: '#FFFFFF',
    },
  };
  return variants[variant];
};

export const getLoadingColor = (variant: ButtonVariant, theme: Theme): string => {
  if (variant === 'outline' || variant === 'ghost') {
    return theme.colors.primary;
  }
  return '#FFFFFF';
};
