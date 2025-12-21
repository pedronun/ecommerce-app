/**
 * Tema do Design System
 * Define os temas light e dark
 */

import { colors, typography, spacing, radius, shadows } from '../tokens';

export type Theme = {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    background: string;
    surface: string;
    error: string;
    success: string;
    warning: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    border: string;
    divider: string;
    overlay: string;
    rating: string;
    discount: string;
  };
  typography: typeof typography;
  spacing: typeof spacing;
  radius: typeof radius;
  shadows: typeof shadows;
};

export const lightTheme: Theme = {
  colors: {
    primary: colors.primary[500],
    primaryLight: colors.primary[300],
    primaryDark: colors.primary[700],
    secondary: colors.secondary[500],
    secondaryLight: colors.secondary[300],
    secondaryDark: colors.secondary[700],
    background: colors.background.default,
    surface: colors.background.paper,
    error: colors.error.main,
    success: colors.success.main,
    warning: colors.warning.main,
    info: colors.info.main,
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
      hint: colors.text.hint,
    },
    border: colors.neutral.gray[300],
    divider: colors.neutral.gray[200],
    overlay: 'rgba(0, 0, 0, 0.5)',
    rating: colors.commerce.rating,
    discount: colors.commerce.discount,
  },
  typography,
  spacing,
  radius,
  shadows,
};

export const darkTheme: Theme = {
  colors: {
    primary: colors.primary[400],
    primaryLight: colors.primary[300],
    primaryDark: colors.primary[600],
    secondary: colors.secondary[400],
    secondaryLight: colors.secondary[300],
    secondaryDark: colors.secondary[600],
    background: colors.background.dark,
    surface: colors.neutral.gray[900],
    error: colors.error.light,
    success: colors.success.light,
    warning: colors.warning.light,
    info: colors.info.light,
    text: {
      primary: colors.neutral.white,
      secondary: colors.neutral.gray[400],
      disabled: colors.neutral.gray[600],
      hint: colors.neutral.gray[500],
    },
    border: colors.neutral.gray[700],
    divider: colors.neutral.gray[800],
    overlay: 'rgba(0, 0, 0, 0.7)',
    rating: colors.commerce.rating,
    discount: colors.commerce.discount,
  },
  typography,
  spacing,
  radius,
  shadows,
};
