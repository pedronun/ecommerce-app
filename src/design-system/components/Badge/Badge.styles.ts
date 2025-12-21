import { ViewStyle, TextStyle } from 'react-native';
import { BadgeVariant, BadgeSize } from './Badge.types';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  spacing: Record<number, number>;
  radius: { full: number };
  typography: {
    fontWeight: { semibold: string };
    fontSize: Record<string, number>;
  };
}

export const getSizeStyles = (size: BadgeSize, theme: Theme, dot: boolean): ViewStyle => {
  if (dot) {
    const dotSizes: Record<BadgeSize, ViewStyle> = {
      sm: { width: 8, height: 8 },
      md: { width: 10, height: 10 },
      lg: { width: 12, height: 12 },
    };
    return dotSizes[size];
  }

  const sizes: Record<BadgeSize, ViewStyle> = {
    sm: {
      paddingHorizontal: theme.spacing[1],
      paddingVertical: 2,
      minWidth: 18,
      minHeight: 18,
    },
    md: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: 4,
      minWidth: 22,
      minHeight: 22,
    },
    lg: {
      paddingHorizontal: theme.spacing[3],
      paddingVertical: theme.spacing[1],
      minWidth: 28,
      minHeight: 28,
    },
  };
  return sizes[size];
};

export const getVariantStyles = (variant: BadgeVariant, theme: Theme): ViewStyle => {
  const variants: Record<BadgeVariant, ViewStyle> = {
    primary: { backgroundColor: theme.colors.primary },
    secondary: { backgroundColor: theme.colors.secondary },
    success: { backgroundColor: theme.colors.success },
    error: { backgroundColor: theme.colors.error },
    warning: { backgroundColor: theme.colors.warning },
    info: { backgroundColor: theme.colors.info },
  };
  return variants[variant];
};

export const getTextSizeStyles = (size: BadgeSize, theme: Theme): TextStyle => {
  const sizes: Record<BadgeSize, TextStyle> = {
    sm: { fontSize: theme.typography.fontSize.xs },
    md: { fontSize: theme.typography.fontSize.sm },
    lg: { fontSize: theme.typography.fontSize.base },
  };
  return sizes[size];
};

