import { StyleSheet } from 'react-native';

import { Theme } from '../../theme/theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing[8],
      paddingVertical: theme.spacing[12],
      gap: theme.spacing[5],
      backgroundColor: theme.colors.background,
    },
    iconWrapper: {
      width: theme.spacing[24],
      height: theme.spacing[24],
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: `${theme.colors.error}1A`,
    },
    textContainer: {
      alignItems: 'center',
      gap: theme.spacing[2],
    },
    devBox: {
      width: '100%',
      borderWidth: 1,
      borderRadius: theme.radius.sm,
      padding: theme.spacing[3],
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.error,
    },
  });
