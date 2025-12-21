import { TouchableOpacityProps } from 'react-native';

export type ChipVariant = 'default' | 'primary' | 'success' | 'error';

export interface ChipProps extends TouchableOpacityProps {
  children: string;
  variant?: ChipVariant;
  selected?: boolean;
  leftIcon?: React.ReactNode;
  onDelete?: () => void;
}
