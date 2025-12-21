/**
 * Tokens de Border Radius do Design System
 * Define os raios de borda para elementos
 */

export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export type RadiusToken = typeof radius;
