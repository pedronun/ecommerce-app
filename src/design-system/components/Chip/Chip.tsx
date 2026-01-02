/**
 * Componente Chip
 * Tags e filtros interativos
 */

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { ChipProps } from './Chip.types';
import { getBaseChipStyles, getVariantStyles, getTextStyles, getTextColor } from './Chip.styles';

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  selected = false,
  leftIcon,
  onDelete,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const chipStyle = {
    ...getBaseChipStyles(theme),
    ...getVariantStyles(variant, selected, theme),
  };

  const textStyle = {
    ...getTextStyles(theme),
    color: getTextColor(variant, selected, theme),
  };

  return (
    <TouchableOpacity style={[chipStyle, style]} activeOpacity={0.7} {...props}>
      {leftIcon && <View style={{ marginRight: theme.spacing[1] }}>{leftIcon}</View>}

      <Text style={textStyle}>{children}</Text>

      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={{ marginLeft: theme.spacing[1] }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[textStyle, { fontSize: 16 }]}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
