export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}
