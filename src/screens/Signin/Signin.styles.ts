import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getSignInStyles = (theme: Theme, insets: EdgeInsets) =>
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
      paddingVertical: theme.spacing[6],
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing[6],
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
    buttonContainer: {
      marginTop: theme.spacing[2],
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing[5],
    },
    loginText: {
      color: theme.colors.text.secondary,
      marginRight: theme.spacing[1],
    },
    loginLink: {
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
    successContainer: {
      backgroundColor: `${theme.colors.success}15`,
      padding: theme.spacing[3],
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: `${theme.colors.success}30`,
      marginBottom: theme.spacing[3],
    },
    successText: {
      color: theme.colors.success,
      textAlign: 'center',
    },
    avatarInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -theme.spacing[2],
      marginBottom: theme.spacing[2],
      paddingHorizontal: theme.spacing[2],
    },
    avatarInfoText: {
      flex: 1,
      color: theme.colors.text.hint,
      fontSize: 12,
      lineHeight: 16,
    },
  });
