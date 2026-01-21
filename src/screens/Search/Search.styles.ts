import { StyleSheet } from 'react-native';
import { type EdgeInsets } from 'react-native-safe-area-context';
import { Theme } from '@design-system/theme/theme';

export const getSearchStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchContainer: {
      paddingHorizontal: theme.spacing[4],
      marginTop: theme.spacing[4],
    },
    historyContainer: {
      padding: theme.spacing[4],
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing[3],
    },
    historyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    clearHistoryButton: {
      paddingVertical: theme.spacing[1],
      paddingHorizontal: theme.spacing[2],
    },
    clearHistoryText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    historyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[3],
      paddingHorizontal: theme.spacing[2],
      borderRadius: theme.radius.md,
      marginBottom: theme.spacing[2],
    },
    historyItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    historyItemText: {
      fontSize: 15,
      color: theme.colors.text.primary,
      marginLeft: theme.spacing[3],
      flex: 1,
    },
    historyItemRemove: {
      padding: theme.spacing[2],
    },
    emptyContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing[6],
      paddingTop: theme.spacing[10],
    },
    emptyIcon: {
      marginBottom: theme.spacing[4],
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: theme.spacing[2],
      textAlign: 'center',
    },
    emptyDescription: {
      fontSize: 15,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 22,
    },
    resultsContainer: {
      flex: 1,
      padding: theme.spacing[4],
    },
    resultsHeader: {
      marginBottom: theme.spacing[4],
    },
    resultsCount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    resultsQuery: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginTop: theme.spacing[1],
    },
    productsList: {
      gap: theme.spacing[4],
      paddingBottom: Math.max(insets.bottom, 16) + 90,
    },
    filterButton: {
      marginTop: theme.spacing[3],
    },
    filterBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      backgroundColor: theme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: '#FFF',
    },
    loadingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing[4],
    },
  });
