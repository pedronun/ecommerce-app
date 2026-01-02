/**
 * Componente Avatar
 * Imagem de perfil ou iniciais
 */

import React from 'react';
import { View, Image, Text } from 'react-native';
import { useTheme } from '@design-system/theme/ThemeContext';
import { AvatarProps } from './Avatar.types';
import {
  getSizeStyles,
  getContainerStyles,
  getTextSizeStyles,
  getImageStyles,
} from './Avatar.styles';

const getInitials = (name: string): string => {
  const names = name.trim().split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  source,
  name,
  backgroundColor,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const containerStyles = {
    ...getSizeStyles(size),
    ...getContainerStyles(theme, backgroundColor),
  };

  const textStyles = {
    color: '#FFFFFF',
    fontWeight: theme.typography.fontWeight.semibold,
    ...getTextSizeStyles(size),
  };

  return (
    <View style={[containerStyles, style]} {...props}>
      {source ? (
        <Image source={source} style={getImageStyles()} resizeMode="cover" />
      ) : (
        <Text style={textStyles}>{name ? getInitials(name) : '?'}</Text>
      )}
    </View>
  );
};
