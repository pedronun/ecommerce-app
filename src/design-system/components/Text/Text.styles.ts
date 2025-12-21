import { TextStyle } from 'react-native';
import { TextVariant } from './Text.types';

interface Theme {
  colors: {
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
  };
  typography: {
    fontSize: Record<string, number>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, number>;
  };
}

export const getVariantStyles = (variant: TextVariant, theme: Theme): TextStyle => {
  const { fontSize, lineHeight } = theme.typography;

  const variants: Record<TextVariant, TextStyle> = {
    h1: {
      fontSize: fontSize['4xl'],
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: lineHeight['4xl'],
    },
    h2: {
      fontSize: fontSize['3xl'],
      fontWeight: '700' as TextStyle['fontWeight'],
      lineHeight: lineHeight['3xl'],
    },
    h3: {
      fontSize: fontSize['2xl'],
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: lineHeight['2xl'],
    },
    h4: {
      fontSize: fontSize.xl,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: lineHeight.xl,
    },
    h5: {
      fontSize: fontSize.lg,
      fontWeight: '500' as TextStyle['fontWeight'],
      lineHeight: lineHeight.lg,
    },
    body1: {
      fontSize: fontSize.base,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: lineHeight.base,
    },
    body2: {
      fontSize: fontSize.sm,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: lineHeight.sm,
    },
    caption: {
      fontSize: fontSize.xs,
      fontWeight: '400' as TextStyle['fontWeight'],
      lineHeight: lineHeight.xs,
    },
    button: {
      fontSize: fontSize.sm,
      fontWeight: '600' as TextStyle['fontWeight'],
      lineHeight: lineHeight.sm,
      textTransform: 'uppercase',
    },
  };

  return variants[variant];
};
