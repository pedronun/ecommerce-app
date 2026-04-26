import { Theme } from '@design-system/theme/theme';
import { StyleSheet } from 'react-native';

export const getBaseStyles = (theme: Theme) =>
  StyleSheet.create({
    section: {
      paddingHorizontal: theme.spacing[4],
      marginBottom: theme.spacing[5],
    },
    updateIconBg: {
      backgroundColor: '#FF980018',
    },
    updateActionText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[2],
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: theme.spacing[3],
    },
    settingIconContainer: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.md,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing[3],
    },
    settingTextContainer: {
      flex: 1,
    },
    settingTitle: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
      fontWeight: '500',
    },
    settingDescription: {
      color: theme.colors.text.secondary,
      lineHeight: 18,
    },
  });
