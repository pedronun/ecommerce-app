/**
 * Estilos do componente TabBar
 */

import { ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../../theme/theme';

export const getContainerStyles = (theme: Theme): ViewStyle => ({
  position: 'absolute',
  bottom: theme.spacing[7], // 28px do fundo
  left: theme.spacing[4], // 16px das laterais
  right: theme.spacing[4], // 16px das laterais
  backgroundColor: theme.colors.surface,
  borderRadius: theme.radius.xl, // 20px para efeito flutuante
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingVertical: theme.spacing[3], // 12px vertical
  paddingHorizontal: theme.spacing[2], // 8px horizontal
  ...theme.shadows.lg, // Sombra grande para efeito flutuante
  // Adiciona borda sutil
  borderWidth: 1,
  borderColor: theme.colors.border,
});

export const getTabItemStyles = (theme: Theme): ViewStyle => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.spacing[2], // 8px
  paddingHorizontal: theme.spacing[1], // 4px
  borderRadius: theme.radius.md, // 12px
  position: 'relative',
});

export const getActiveIndicatorStyles = (theme: Theme): ViewStyle => ({
  position: 'absolute',
  top: 0,
  left: '10%',
  right: '10%',
  bottom: 0,
  backgroundColor: theme.colors.primaryLight,
  borderRadius: theme.radius.md,
  opacity: 0.15,
});

export const getIconWrapperStyles = (): ViewStyle => ({
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
});

export const getBadgeStyles = (theme: Theme): ViewStyle => ({
  position: 'absolute',
  top: -4,
  right: -8,
  backgroundColor: theme.colors.error,
  borderRadius: theme.radius.full,
  minWidth: 18,
  height: 18,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: theme.spacing[1],
  borderWidth: 2,
  borderColor: theme.colors.surface,
});

export const getBadgeTextStyles = (theme: Theme): TextStyle => ({
  color: theme.colors.text.primary,
  fontSize: 10,
  fontWeight: '600',
  lineHeight: 14,
});

export const getLabelStyles = (theme: Theme, isActive: boolean, color?: string): TextStyle => ({
  fontSize: theme.typography.fontSize.xs,
  fontWeight: isActive ? '600' : '500',
  color: color || (isActive ? theme.colors.primary : theme.colors.text.secondary),
  marginTop: theme.spacing[1], // 4px
});
