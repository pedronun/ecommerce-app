import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { ProductShelf } from '@components/ProductShelf';
import { Skeleton } from '@design-system/components/Skeleton/Skeleton';
import { Text } from '@design-system/components/Text';
import { useTheme } from '@design-system/theme/ThemeContext';
import { Product } from '@typings/product';
import { getSliderStyles } from './Slider.styles';
import { SliderProps } from './Slider.types';

const SKELETON_COUNT = 4;
const CARD_WIDTH = 200;
const CARD_IMAGE_HEIGHT = 200;

const SliderSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{ gap: theme.spacing[2] }}
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <View
          key={index}
          style={{
            width: CARD_WIDTH,
            borderRadius: theme.radius.lg,
            backgroundColor: theme.colors.surface,
            overflow: 'hidden',
            ...theme.shadows.md,
          }}
        >
          <Skeleton
            variant="rectangular"
            animation={false}
            width={CARD_WIDTH}
            height={CARD_IMAGE_HEIGHT}
          />
          <View style={{ padding: theme.spacing[3], gap: theme.spacing[2] }}>
            <Skeleton variant="text" width="60%" height={12} />
            <Skeleton variant="text" width="100%" height={14} />
            <Skeleton variant="text" width="50%" height={14} />
            <Skeleton variant="text" width="45%" height={20} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={36}
              style={{ borderRadius: theme.radius.md }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export const Slider: React.FC<SliderProps> = ({
  title,
  products = [],
  horizontal = true,
  showSeparator = true,
  isLoading = false,
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

      {isLoading ? (
        <SliderSkeleton />
      ) : (
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
      )}
    </View>
  );
};
