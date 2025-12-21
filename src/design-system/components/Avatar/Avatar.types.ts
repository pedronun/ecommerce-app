import { ViewProps, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends ViewProps {
  size?: AvatarSize;
  source?: ImageSourcePropType;
  name?: string;
  backgroundColor?: string;
}
