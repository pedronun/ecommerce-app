import { ViewProps } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
  onPress?: () => void;
}

