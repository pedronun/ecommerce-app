import { ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native';
import { Theme } from '@design-system/theme/theme';
import { ProductShelfVariant } from './ProductShelf.types';

export const getBaseStyles = (theme: Theme) => ({
  container: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden' as const,
    width: 200,
  } as ViewStyle,

  imageContainer: {
    width: '100%',
    backgroundColor: theme.colors.background,
    position: 'relative' as const,
  } as ViewStyle,

  image: {
    width: '100%',
    resizeMode: 'cover' as const,
  } as ImageStyle,

  favoriteButton: {
    position: 'absolute' as const,
    top: theme.spacing[2],
    right: theme.spacing[2],
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.full,
    padding: theme.spacing[2],
    ...theme.shadows.sm,
  } as ViewStyle,

  discountBadge: {
    position: 'absolute' as const,
    top: theme.spacing[2],
    left: theme.spacing[2],
  } as ViewStyle,

  content: {
    padding: theme.spacing[3],
  } as ViewStyle,

  categoryContainer: {
    marginBottom: theme.spacing[1],
  } as ViewStyle,

  categoryText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as TextStyle,

  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  } as TextStyle,

  description: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
  } as TextStyle,

  priceContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: theme.spacing[2],
  } as ViewStyle,

  price: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  } as TextStyle,

  footer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing[2],
  } as ViewStyle,

  quantityContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing[2],
    flex: 1,
  } as ViewStyle,

  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,

  quantityTextContainer: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,

  quantityText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  } as TextStyle,
});

export const getVariantStyles = (
  variant: ProductShelfVariant,
  theme: Theme
): {
  container: ViewStyle;
  imageContainer: ViewStyle;
  image: ImageStyle;
} => {
  const variants = {
    default: {
      container: {
        width: 200,
        ...theme.shadows.md,
      } as ViewStyle,
      imageContainer: {
        height: 200,
      } as ViewStyle,
      image: {
        height: 200,
      } as ImageStyle,
    },
    compact: {
      container: {
        width: Dimensions.get('window').width - theme.spacing[4] * 2,
        flexDirection: 'row' as const,
        ...theme.shadows.sm,
      } as ViewStyle,
      imageContainer: {
        width: 120,
        height: 120,
      } as ViewStyle,
      image: {
        width: 120,
        height: 120,
      } as ImageStyle,
    },
    featured: {
      container: {
        width: 300,
        ...theme.shadows.lg,
      } as ViewStyle,
      imageContainer: {
        height: 280,
      } as ViewStyle,
      image: {
        height: 280,
      } as ImageStyle,
    },
  };

  return variants[variant];
};

export const getCompactContentStyles = (theme: Theme) => ({
  content: {
    flex: 1,
    padding: theme.spacing[3],
    justifyContent: 'space-between' as const,
  } as ViewStyle,

  title: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  } as TextStyle,

  description: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
    lineHeight: 16,
  } as TextStyle,

  price: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  } as TextStyle,
});
