import { ViewStyle } from 'react-native';
import { Theme } from '@design-system/theme/theme';

export const getDotsContainerStyle = (theme: Theme): ViewStyle => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing[2],
  paddingVertical: theme.spacing[3],
});

export const getDotStyle = (theme: Theme, active: boolean, size: number = 8): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: active ? theme.colors.primary : theme.colors.border,
});
