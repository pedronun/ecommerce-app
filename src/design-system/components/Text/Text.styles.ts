import { TextStyle } from 'react-native';
import { TextVariant } from './Text.types';
import { Theme } from '@design-system/theme/theme';

export const getVariantStyles = (variant: TextVariant, theme: Theme): TextStyle => {
  const { fontSize } = theme.typography;

  const variants: Record<TextVariant, TextStyle> = {
    h1: {
      fontSize: fontSize['4xl'],
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: fontSize['4xl'] * 1.2,
    },
    h2: {
      fontSize: fontSize['3xl'],
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: fontSize['3xl'] * 1.2,
    },
    h3: {
      fontSize: fontSize['2xl'],
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: fontSize['2xl'] * 1.3,
    },
    h4: {
      fontSize: fontSize.xl,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: fontSize.xl * 1.4,
    },
    h5: {
      fontSize: fontSize.lg,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: fontSize.lg * 1.4,
    },
    body1: {
      fontSize: fontSize.base,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: fontSize.base * 1.5,
    },
    body2: {
      fontSize: fontSize.sm,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: fontSize.sm * 1.5,
    },
    caption: {
      fontSize: fontSize.xs,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: fontSize.xs * 1.5,
    },
    button: {
      fontSize: fontSize.sm,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: fontSize.sm * 1.5,
      textTransform: 'uppercase',
    },
  };

  return variants[variant];
};
