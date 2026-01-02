import { StyleSheet, Platform } from 'react-native';
import { ToastType } from './Toast.types';
import { Theme } from '@design-system/theme/theme';

export const TOAST_HEIGHT = 60;
export const TOP_OFFSET = Platform.OS === 'ios' ? 50 : 20;
export const WHITE_COLOR = '#FFFFFF';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  topPosition: {
    top: TOP_OFFSET,
  },
  bottomPosition: {
    bottom: 20,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: TOAST_HEIGHT,
  },
  iconContainer: {
    marginRight: 12,
  },
  messageContainer: {
    flex: 1,
  },
  actionContainer: {
    marginLeft: 12,
  },
});

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
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };
  return icons[type];
};
