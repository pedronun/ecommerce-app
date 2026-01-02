/**
 * Componente Input
 * Campo de entrada de texto com label, ícones e validação
 */

import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { Text } from '@design-system/components/Text';
import { InputProps } from './Input.types';
import {
  getContainerStyles,
  getLabelStyles,
  getInputWrapperStyles,
  getInputFieldStyles,
  getIconWrapperStyles,
  getHelperTextStyles,
} from './Input.styles';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = Boolean(error);

  return (
    <View style={[getContainerStyles(theme), containerStyle]}>
      {label && <Text style={getLabelStyles(theme)}>{label}</Text>}

      <View
        style={[
          getInputWrapperStyles(theme, hasError),
          isFocused && { borderColor: theme.colors.primary },
        ]}
      >
        {leftIcon && <View style={getIconWrapperStyles(theme, 'left')}>{leftIcon}</View>}

        <TextInput
          style={[getInputFieldStyles(theme), inputStyle]}
          placeholderTextColor={`${theme.colors.text.secondary}60`}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />

        {rightIcon && <View style={getIconWrapperStyles(theme, 'right')}>{rightIcon}</View>}
      </View>

      {(error || helperText) && (
        <Text style={getHelperTextStyles(theme, hasError)}>{error || helperText}</Text>
      )}
    </View>
  );
};
