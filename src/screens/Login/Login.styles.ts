import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getLoginStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: Math.max(insets.bottom, 16) + 20,
    },
    contentWrapper: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.spacing[5],
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing[8],
    },
    logoIconWrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: `${theme.colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing[3],
    },
    title: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    subtitle: {
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    formContainer: {
      gap: theme.spacing[4],
    },
    inputContainer: {
      marginBottom: theme.spacing[1],
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginTop: -theme.spacing[2],
      marginBottom: theme.spacing[2],
    },
    forgotPasswordText: {
      color: theme.colors.primary,
    },
    buttonContainer: {
      marginTop: theme.spacing[2],
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing[6],
    },
    registerText: {
      color: theme.colors.text.secondary,
      marginRight: theme.spacing[1],
    },
    registerLink: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    errorContainer: {
      backgroundColor: `${theme.colors.error}15`,
      padding: theme.spacing[3],
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: `${theme.colors.error}30`,
      marginBottom: theme.spacing[3],
    },
    errorText: {
      color: theme.colors.error,
      textAlign: 'center',
    },
  });
