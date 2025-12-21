import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { AvatarSize } from './Avatar.types';
import { Theme } from '@design-system/theme/theme';

export const getSizeStyles = (size: AvatarSize): ViewStyle => {
  const sizes: Record<AvatarSize, ViewStyle> = {
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 96, height: 96 },
  };
  return sizes[size];
};

export const getContainerStyles = (theme: Theme, backgroundColor?: string): ViewStyle => ({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: theme.radius.full,
  backgroundColor: backgroundColor || theme.colors.primary,
  overflow: 'hidden',
});

export const getTextSizeStyles = (size: AvatarSize): TextStyle => {
  const textSizes: Record<AvatarSize, TextStyle> = {
    sm: { fontSize: 14 },
    md: { fontSize: 18 },
    lg: { fontSize: 24 },
    xl: { fontSize: 36 },
  };
  return textSizes[size];
};

export const getImageStyles = (): ImageStyle => ({
  width: '100%',
  height: '100%',
});
