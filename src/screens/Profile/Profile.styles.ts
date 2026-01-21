import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getProfileStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingBottom: Math.max(insets.bottom, 16) + 90,
    },
    profileHeader: {
      alignItems: 'center',
      paddingTop: theme.spacing[6],
      paddingBottom: theme.spacing[5],
      paddingHorizontal: theme.spacing[4],
      backgroundColor: theme.colors.surface,
      marginBottom: theme.spacing[5],
    },
    avatarWrapper: {
      marginBottom: theme.spacing[3],
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: `${theme.colors.primary}10`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userName: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    userEmail: {
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[2],
    },
    mainDivider: {
      marginVertical: theme.spacing[4],
    },
    section: {
      paddingHorizontal: theme.spacing[4],
      marginBottom: theme.spacing[5],
    },
    sectionTitle: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[3],
      fontWeight: '600',
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    placeholderContainer: {
      alignItems: 'center',
      paddingVertical: theme.spacing[6],
      paddingHorizontal: theme.spacing[4],
    },
    placeholderIcon: {
      marginBottom: theme.spacing[3],
      opacity: 0.5,
    },
    placeholderText: {
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[1],
      textAlign: 'center',
    },
    placeholderDescription: {
      color: theme.colors.text.hint,
      textAlign: 'center',
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
    userDataContainer: {
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[2],
    },
    userDataItem: {
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[2],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    userDataItemLast: {
      borderBottomWidth: 0,
    },
    userDataLabel: {
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing[1],
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    userDataValue: {
      color: theme.colors.text.primary,
      fontSize: 16,
    },
    userDataBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing[1],
    },
    roleBadge: {
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      borderRadius: theme.radius.sm,
      backgroundColor: `${theme.colors.primary}15`,
    },
    roleBadgeText: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    logoutButton: {
      marginTop: theme.spacing[4],
      marginHorizontal: theme.spacing[4],
    },
    logoutButtonContainer: {
      paddingVertical: theme.spacing[2],
    },
  });
