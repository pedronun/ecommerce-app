import { Theme } from '@design-system/theme/theme';
import { EdgeInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export const getCategoryProductsStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[3],
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      gap: theme.spacing[3],
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: theme.radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    headerContent: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
    },
    subtitle: {
      fontSize: 13,
      color: theme.colors.text.secondary,
    },
    listContent: {
      padding: theme.spacing[4],
      paddingBottom: insets.bottom + theme.spacing[4],
      gap: theme.spacing[4],
    },
    columnWrapper: {
      justifyContent: 'space-between',
      gap: theme.spacing[3],
    },
    productItem: {
      flex: 1,
      maxWidth: '48%',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[12],
    },
    emptyIcon: {
      marginBottom: theme.spacing[4],
      opacity: 0.5,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    emptyDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[12],
    },
    errorIcon: {
      marginBottom: theme.spacing[4],
    },
    errorTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    errorDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: theme.spacing[6],
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing[6],
      paddingVertical: theme.spacing[3],
      borderRadius: theme.radius.md,
    },
    retryButtonText: {
      color: theme.colors.surface,
      fontSize: 14,
      fontWeight: '600',
    },
    footerLoader: {
      paddingVertical: theme.spacing[4],
      alignItems: 'center',
    },
    skeletonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing[4],
      gap: theme.spacing[3],
    },
    skeletonCard: {
      width: '48%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    skeletonImage: {
      width: '100%',
      height: 150,
      backgroundColor: theme.colors.border,
    },
    skeletonContent: {
      padding: theme.spacing[3],
      gap: theme.spacing[2],
    },
    skeletonTitle: {
      height: 16,
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      width: '80%',
    },
    skeletonPrice: {
      height: 20,
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      width: '50%',
    },
    skeletonCategory: {
      height: 12,
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      width: '60%',
    },
  });
