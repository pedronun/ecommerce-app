import { ViewStyle } from 'react-native';
import { CardVariant } from './Card.types';
import { Theme } from '@design-system/theme/theme';

export const getVariantStyles = (variant: CardVariant, theme: Theme): ViewStyle => {
  const variants: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: theme.colors.surface,
      ...theme.shadows.md,
    },
    outlined: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.background,
    },
  };
  return variants[variant];
};

export const getBaseCardStyles = (theme: Theme): ViewStyle => ({
  borderRadius: theme.radius.lg,
  padding: theme.spacing[4],
});
