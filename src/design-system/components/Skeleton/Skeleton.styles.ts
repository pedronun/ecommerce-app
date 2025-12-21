import { ViewStyle } from 'react-native';
import { SkeletonVariant } from './Skeleton.types';

interface Theme {
  colors: {
    border: string;
  };
  radius: {
    full: number;
    lg: number;
    md: number;
  };
  spacing: Record<number, number>;
}

export const getVariantStyles = (variant: SkeletonVariant, theme: Theme): ViewStyle => {
  const variants: Record<SkeletonVariant, ViewStyle> = {
    text: {
      borderRadius: theme.radius.md,
    },
    circular: {
      borderRadius: theme.radius.full,
    },
    rectangular: {
      borderRadius: 0,
    },
    rounded: {
      borderRadius: theme.radius.lg,
    },
  };
  return variants[variant];
};

export const getBaseStyles = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.border,
  overflow: 'hidden',
});

// Estilos para presets
export const rowStyles: ViewStyle = {
  flexDirection: 'row',
};

export const cardContainerStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
});

export const cardContentStyles = (): ViewStyle => ({
  flex: 1,
});

export const listItemStyles = (): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
});

export const listItemContentStyles = (): ViewStyle => ({
  flex: 1,
});
