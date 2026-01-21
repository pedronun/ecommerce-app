import type { Theme } from '@design-system/theme/theme';
import Constants from 'expo-constants';
import { Platform, StyleSheet } from 'react-native';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : theme.spacing[3],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      ...theme.shadows.sm,
    },
    leftSection: {
      flex: 1,
      alignItems: 'flex-start',
    },
    backButton: {
      padding: theme.spacing[2],
    },
    centerSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightSection: {
      flex: 1,
      alignItems: 'flex-end',
    },
    logoContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      padding: theme.spacing[2],
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.xs,
    },
    notificationButton: {
      position: 'relative',
      padding: theme.spacing[2],
    },
    badgeContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: theme.colors.error,
      borderRadius: theme.radius.full,
      minWidth: 18,
      height: 18,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    badgeText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: 'bold',
      lineHeight: 14,
    },
  });
