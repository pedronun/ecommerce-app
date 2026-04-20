import { FlashListProps } from '@shopify/flash-list';
import { ViewStyle } from 'react-native';
import { Product } from '@typings/product';

type FlashListExtras = Omit<
  FlashListProps<Product>,
  | 'data'
  | 'renderItem'
  | 'horizontal'
  | 'keyExtractor'
  | 'ItemSeparatorComponent'
  | 'ListEmptyComponent'
  | 'ListHeaderComponent'
  | 'contentContainerStyle'
>;

export interface SliderProps extends FlashListExtras {
  title?: string;
  products: Product[];
  horizontal?: boolean;
  showSeparator?: boolean;
  isLoading?: boolean;
  onProductPress?: (product: Product) => void;
  ListEmptyComponent?: FlashListProps<Product>['ListEmptyComponent'];
  ListHeaderComponent?: FlashListProps<Product>['ListHeaderComponent'];
  contentContainerStyle?: FlashListProps<Product>['contentContainerStyle'];
  style?: ViewStyle;
}
