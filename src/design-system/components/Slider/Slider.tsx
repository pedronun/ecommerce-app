/**
 * Componente Slider
 * Slider reutilizável de produtos usando FlashList
 */
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTheme } from '@design-system/theme/ThemeContext';
import { ProductShelf } from '@components/ProductShelf';
import { SliderProps } from './Slider.types';
import { Product } from '@typings/product';
import { getSliderStyles } from './Slider.styles';
import { Text } from '@design-system/components/Text';

export const Slider: React.FC<SliderProps> = ({
  title,
  products = [],
  horizontal = true,
  showSeparator = true,
  onProductPress,
  ListEmptyComponent,
  ListHeaderComponent,
  contentContainerStyle,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getSliderStyles(theme);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductShelf product={item} onPress={() => onProductPress?.(item)} />
    ),
    [onProductPress]
  );

  const ItemSeparator = useCallback(
    () => (showSeparator ? <View style={styles.separator} /> : null),
    [showSeparator, styles]
  );

  return (
    <View style={[styles.container, style]}>
      {title && <Text variant="h3">{title}</Text>}

      <FlashList
        data={products}
        renderItem={renderItem}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={contentContainerStyle}
        keyExtractor={(item, index) => (item?.id ? String(item.id) : String(index))}
        {...props}
      />
    </View>
  );
};
