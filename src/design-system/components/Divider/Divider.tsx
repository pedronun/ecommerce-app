/**
 * Componente Divider
 * Linha divisória horizontal ou vertical
 */

import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export interface DividerProps extends ViewProps {
  orientation?: 'horizontal' | 'vertical';
  size?: number;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  size = 1,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const dividerStyle: ViewStyle = {
    backgroundColor: theme.colors.divider,
    ...(orientation === 'horizontal'
      ? { height: size, width: '100%' }
      : { width: size, height: '100%' }),
  };

  return <View style={[dividerStyle, style]} {...props} />;
};

