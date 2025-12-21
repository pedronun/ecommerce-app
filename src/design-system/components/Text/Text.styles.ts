import { TextStyle } from 'react-native';
import { TextVariant } from './Text.types';

interface Theme {
  colors: { text: string };
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, number>;
  };
}

export const getVariantStyles = (variant: TextVariant, theme: Theme): TextStyle => {
  const { fontSize, fontWeight, lineHeight } = theme.typography;

  const variants: Record<TextVariant, TextStyle> = {
    h1: {
      fontSize: fontSize['4xl'],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight['4xl'],
    },
    h2: {
      fontSize: fontSize['3xl'],
      fontWeight: fontWeight.bold,
      lineHeight: lineHeight['3xl'],
    },
    h3: {
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight['2xl'],
    },
    h4: {
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.xl,
    },
    h5: {
      fontSize: fontSize.lg,
      fontWeight: fontWeight.medium,
      lineHeight: lineHeight.lg,
    },
    body1: {
      fontSize: fontSize.base,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.base,
    },
    body2: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.sm,
    },
    caption: {
      fontSize: fontSize.xs,
      fontWeight: fontWeight.regular,
      lineHeight: lineHeight.xs,
    },
    button: {
      fontSize: fontSize.sm,
      fontWeight: fontWeight.semibold,
      lineHeight: lineHeight.sm,
      textTransform: 'uppercase',
    },
  };

  return variants[variant];
};

