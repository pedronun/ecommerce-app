import { StyleSheet, Platform } from 'react-native';
import { colors } from '@design-system/tokens/colors';
import { Theme } from '@design-system/theme/theme';
import { ToastType } from './Toast.types';

export const TOP_OFFSET = Platform.OS === 'ios' ? 50 : 20;
export const WHITE_COLOR = '#FFFFFF';
export const SLIDE_OFFSET = -120;
export const ANIMATION_DURATION = 220;

export const getToastStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: TOP_OFFSET,
      left: theme.spacing[4],
      right: theme.spacing[4],
      zIndex: 9999,
      borderRadius: theme.radius.sm,
      ...theme.shadows.xl,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      gap: theme.spacing[2],
    },
    textContainer: {
      flex: 1,
    },
    title: {},
    message: {
      opacity: 0.9,
    },
    indicator: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: theme.spacing[2],
      borderTopLeftRadius: theme.radius.sm,
      borderBottomLeftRadius: theme.radius.sm,
    },
  });

export const getToastColors = (
  type: ToastType,
  theme: Theme
): { bg: string; indicator: string; textColor: string } => {
  const map: Record<ToastType, { bg: string; indicator: string; textColor: string }> = {
    success: {
      bg: theme.colors.success,
      indicator: colors.success.light,
      textColor: WHITE_COLOR,
    },
    error: {
      bg: theme.colors.error,
      indicator: colors.error.light,
      textColor: WHITE_COLOR,
    },
    warning: {
      bg: theme.colors.warning,
      indicator: colors.warning.light,
      textColor: WHITE_COLOR,
    },
    info: {
      bg: theme.colors.info,
      indicator: colors.info.light,
      textColor: WHITE_COLOR,
    },
  };
  return map[type];
};

export const getToastBackgroundColor = (type: ToastType, theme: Theme): string => {
  const colors: Record<ToastType, string> = {
    success: theme.colors.success,
    error: theme.colors.error,
    warning: theme.colors.warning,
    info: theme.colors.info,
  };
  return colors[type];
};

export const getToastIcon = (type: ToastType): string => {
  const icons: Record<ToastType, string> = {
    success: 'check-circle',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  return icons[type];
};
