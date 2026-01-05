import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getMenuStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      paddingBottom: Math.max(insets.bottom, 16) + 60,
    },
    header: {
      paddingTop: theme.spacing[6],
      paddingHorizontal: theme.spacing[4],
      paddingBottom: theme.spacing[4],
      backgroundColor: theme.colors.surface,
    },
    title: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
    },
    subtitle: {
      color: theme.colors.text.secondary,
    },
    categoriesContainer: {
      paddingHorizontal: theme.spacing[4],
      paddingTop: theme.spacing[4],
    },
    categoryCard: {
      marginBottom: theme.spacing[3],
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing[4],
    },
    categoryImageWrapper: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.md,
      backgroundColor: `${theme.colors.primary}10`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing[3],
      overflow: 'hidden',
    },
    categoryImage: {
      width: '100%',
      height: '100%',
    },
    categoryInfo: {
      flex: 1,
    },
    categoryName: {
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[1],
      fontWeight: '600',
    },
    categorySlug: {
      color: theme.colors.text.secondary,
      fontSize: 12,
    },
    categoryArrow: {
      marginLeft: theme.spacing[2],
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing[8],
    },
    loadingText: {
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[3],
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing[8],
      paddingHorizontal: theme.spacing[4],
    },
    emptyIcon: {
      marginBottom: theme.spacing[3],
      opacity: 0.5,
    },
    emptyText: {
      color: theme.colors.text.secondary,
      textAlign: 'center',
      marginBottom: theme.spacing[1],
    },
    emptyDescription: {
      color: theme.colors.text.hint,
      textAlign: 'center',
    },
    skeletonCard: {
      marginBottom: theme.spacing[3],
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: theme.spacing[4],
      flexDirection: 'row',
      alignItems: 'center',
    },
    skeletonImage: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.md,
      backgroundColor: `${theme.colors.text.disabled}20`,
      marginRight: theme.spacing[3],
    },
    skeletonContent: {
      flex: 1,
    },
    skeletonTitle: {
      height: 20,
      backgroundColor: `${theme.colors.text.disabled}20`,
      borderRadius: theme.radius.sm,
      marginBottom: theme.spacing[2],
      width: '70%',
    },
    skeletonSubtitle: {
      height: 14,
      backgroundColor: `${theme.colors.text.disabled}20`,
      borderRadius: theme.radius.sm,
      width: '40%',
    },
  });
