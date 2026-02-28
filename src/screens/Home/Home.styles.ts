import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getHomeStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingBottom: Math.max(insets.bottom, 16) + 90,
    },
  });
