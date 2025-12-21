import { ViewStyle } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
  animation?: boolean;
}

export interface SkeletonPresetProps {
  animation?: boolean;
}

