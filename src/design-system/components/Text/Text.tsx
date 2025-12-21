/**
 * Componente Text
 * Componente de texto tipográfico com variantes predefinidas
 */

import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { TextProps } from './Text.types';
import { getVariantStyles } from './Text.styles';

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const textStyle = {
    color: color || theme.colors.text,
    textAlign: align,
    ...getVariantStyles(variant, theme),
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
