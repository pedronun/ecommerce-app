import { ViewStyle } from 'react-native';
import { CardVariant } from './Card.types';

interface Theme {
  colors: {
    card: string;
    border: string;
    cardAlt: string;
  };
  spacing: Record<number, number>;
  radius: { lg: number };
  shadows: { md: ViewStyle };
}

export const getVariantStyles = (variant: CardVariant, theme: Theme): ViewStyle => {
  const variants: Record<CardVariant, ViewStyle> = {
    elevated: {
      backgroundColor: theme.colors.card,
      ...theme.shadows.md,
    },
    outlined: {
      backgroundColor: theme.colors.card,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filled: {
      backgroundColor: theme.colors.cardAlt,
    },
  };
  return variants[variant];
};

export const getBaseCardStyles = (theme: Theme): ViewStyle => ({
  borderRadius: theme.radius.lg,
  padding: theme.spacing[4],
});

