import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { DividerProps } from './Divider.types';

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
