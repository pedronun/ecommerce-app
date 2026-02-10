import React, { useState, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import ReanimatedCarousel from 'react-native-reanimated-carousel';
import { useTheme } from '@design-system/theme/ThemeContext';
import { CarouselProps } from './Carousel.types';
import { getDotsContainerStyle, getDotStyle } from './Carousel.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DEFAULT_HEIGHT = 180;

export function Carousel<T>({
  data,
  renderItem,
  autoplay = false,
  autoplayInterval = 4000,
  showDots = true,
  slideWidth = SCREEN_WIDTH,
  gap = 0,
  onSlideChange,
  style,
}: CarouselProps<T>) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const itemWidth = slideWidth + gap;
  const carouselHeight =
    style &&
    typeof style === 'object' &&
    'height' in style &&
    typeof (style as { height?: number }).height === 'number'
      ? (style as { height: number }).height
      : DEFAULT_HEIGHT;

  const handleSnapToItem = useCallback(
    (index: number) => {
      const realIndex = data.length > 0 ? index % data.length : 0;
      setActiveIndex(realIndex);
      onSlideChange?.(realIndex);
    },
    [data.length, onSlideChange]
  );

  if (!data.length) return null;

  return (
    <View style={style}>
      <ReanimatedCarousel<T>
        data={data}
        width={itemWidth}
        height={carouselHeight}
        loop={data.length > 1}
        autoPlay={autoplay && data.length > 1}
        autoPlayInterval={autoplayInterval}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item, index }) => (
          <View style={{ width: slideWidth, ...(gap > 0 && { marginRight: gap }) }}>
            {renderItem(item, index)}
          </View>
        )}
      />
      {showDots && data.length > 1 && (
        <View style={getDotsContainerStyle(theme)}>
          {data.map((_, index) => (
            <View key={`dot-${index}`} style={getDotStyle(theme, index === activeIndex)} />
          ))}
        </View>
      )}
    </View>
  );
}
