import { ViewStyle, TextStyle } from 'react-native';
import { ChipVariant } from './Chip.types';

interface Theme {
  colors: {
    primary: string;
    success: string;
    error: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
  };
  spacing: Record<number, number>;
  radius: { full: number };
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, string>;
  };
}

export const getVariantStyles = (
  variant: ChipVariant,
  selected: boolean,
  theme: Theme
): ViewStyle => {
  if (selected) {
    const selectedVariants: Record<ChipVariant, ViewStyle> = {
      default: {
        backgroundColor: `${theme.colors.text.primary}20`,
        borderColor: theme.colors.text.primary,
      },
      primary: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      },
      success: {
        backgroundColor: theme.colors.success,
        borderColor: theme.colors.success,
      },
      error: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
      },
    };
    return selectedVariants[variant];
  }

  const variants: Record<ChipVariant, ViewStyle> = {
    default: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.border,
    },
    primary: {
      backgroundColor: `${theme.colors.primary}20`,
      borderColor: theme.colors.primary,
    },
    success: {
      backgroundColor: `${theme.colors.success}20`,
      borderColor: theme.colors.success,
    },
    error: {
      backgroundColor: `${theme.colors.error}20`,
      borderColor: theme.colors.error,
    },
  };
  return variants[variant];
};

export const getTextColor = (variant: ChipVariant, selected: boolean, theme: Theme): string => {
  if (selected && variant !== 'default') {
    return '#FFFFFF';
  }

  const colors: Record<ChipVariant, string> = {
    default: theme.colors.text.primary,
    primary: theme.colors.primary,
    success: theme.colors.success,
    error: theme.colors.error,
  };
  return colors[variant];
};

export const getBaseChipStyles = (theme: Theme): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: theme.spacing[1],
  paddingHorizontal: theme.spacing[3],
  borderRadius: theme.radius.full,
  borderWidth: 1,
});

export const getTextStyles = (theme: Theme): TextStyle => ({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: '500' as TextStyle['fontWeight'],
});
