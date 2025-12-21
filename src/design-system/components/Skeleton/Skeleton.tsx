/**
 * Componente Skeleton
 * Placeholder animado para carregamento de conteúdo
 */

import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/ThemeContext';
import { SkeletonProps, SkeletonPresetProps } from './Skeleton.types';
import {
  getVariantStyles,
  getBaseStyles,
  cardContainerStyles,
  cardContentStyles,
  listItemStyles,
  listItemContentStyles,
} from './Skeleton.styles';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  style,
  animation = true,
}) => {
  const { theme } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (animation) {
      progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
    }
  }, [animation, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.3, 0.7]);

    return {
      opacity,
    };
  });

  const skeletonStyle: ViewStyle = {
    width: width as ViewStyle['width'],
    height: height as ViewStyle['height'],
    ...getBaseStyles(theme),
    ...getVariantStyles(variant, theme),
  };

  return <Animated.View style={[skeletonStyle, animation && animatedStyle, style]} />;
};

// Presets de Skeleton
export const SkeletonText: React.FC<SkeletonPresetProps> = ({ animation = true }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Skeleton variant="text" width="100%" height={16} animation={animation} />
      <View style={{ height: theme.spacing[2] }} />
      <Skeleton variant="text" width="80%" height={16} animation={animation} />
    </View>
  );
};

export const SkeletonCard: React.FC<SkeletonPresetProps> = ({ animation = true }) => {
  const { theme } = useTheme();
  return (
    <View>
      <Skeleton variant="rectangular" width="100%" height={200} animation={animation} />
      <View style={{ height: theme.spacing[3] }} />
      <View style={cardContainerStyles()}>
        <Skeleton variant="circular" width={48} height={48} animation={animation} />
        <View style={{ width: theme.spacing[3] }} />
        <View style={cardContentStyles()}>
          <Skeleton variant="text" width="70%" height={16} animation={animation} />
          <View style={{ height: theme.spacing[2] }} />
          <Skeleton variant="text" width="50%" height={14} animation={animation} />
        </View>
      </View>
    </View>
  );
};

export const SkeletonList: React.FC<SkeletonPresetProps> = ({ animation = true }) => {
  const { theme } = useTheme();
  return (
    <View>
      {[1, 2, 3].map((item) => (
        <View key={item} style={{ marginBottom: theme.spacing[4] }}>
          <View style={listItemStyles()}>
            <Skeleton variant="circular" width={40} height={40} animation={animation} />
            <View style={{ width: theme.spacing[3] }} />
            <View style={listItemContentStyles()}>
              <Skeleton variant="text" width="100%" height={16} animation={animation} />
              <View style={{ height: theme.spacing[2] }} />
              <Skeleton variant="text" width="60%" height={14} animation={animation} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
