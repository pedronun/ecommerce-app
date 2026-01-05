import { StyleSheet } from 'react-native';
import { Theme } from '@design-system/theme/theme';

export const getCartStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });
