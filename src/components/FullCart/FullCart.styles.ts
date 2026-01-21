import { StyleSheet } from 'react-native';
import { Theme } from '@design-system/theme/theme';

export const getFullCartStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 24,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 12,
    },
    headerTitle: {
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    headerSubtitle: {
      color: theme.colors.text.secondary,
    },
    itemsList: {
      paddingHorizontal: 16,
      gap: 12,
    },
    itemCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 12,
      gap: 12,
    },
    itemImage: {
      width: 90,
      height: 90,
      borderRadius: 8,
      backgroundColor: theme.colors.background,
    },
    itemInfo: {
      flex: 1,
      justifyContent: 'space-between',
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 8,
    },
    itemTitle: {
      flex: 1,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemPrice: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      gap: 8,
      paddingHorizontal: 4,
    },
    quantityBtn: {
      width: 32,
      height: 32,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
    },
    quantityText: {
      minWidth: 32,
      textAlign: 'center',
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    footer: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    summarySection: {
      gap: 8,
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryLabel: {
      color: theme.colors.text.secondary,
    },
    summaryValue: {
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    summaryValueFree: {
      color: theme.colors.success,
      fontWeight: '600',
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
    totalPrice: {
      color: theme.colors.text.primary,
      fontWeight: '700',
    },
  });
