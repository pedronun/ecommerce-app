/**
 * Componente BottomSheet
 * Modal deslizante com gestos que aparece na parte inferior da tela
 */

import React, { useEffect } from 'react';
import { Modal, View, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '@design-system/theme/ThemeContext';
import { BottomSheetProps } from './BottomSheet.types';
import {
  styles,
  getSheetContainerStyles,
  getHandleContainerStyles,
  calculateSnapPoint,
} from './BottomSheet.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  snapPoint = 'half',
  children,
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
}) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const context = useSharedValue({ y: 0 });
  const backdropAnimatedOpacity = useSharedValue(0);

  const sheetHeight = calculateSnapPoint(snapPoint, SCREEN_HEIGHT);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(SCREEN_HEIGHT - sheetHeight, {
        damping: 50,
        stiffness: 400,
      });
      backdropAnimatedOpacity.value = withTiming(backdropOpacity, { duration: 300 });
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
      backdropAnimatedOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [visible, sheetHeight, backdropOpacity, translateY, backdropAnimatedOpacity]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newTranslateY = context.value.y + event.translationY;
      if (newTranslateY >= SCREEN_HEIGHT - sheetHeight) {
        translateY.value = newTranslateY;
      }
    })
    .onEnd((event) => {
      const shouldClose = event.translationY > 50 || event.velocityY > 500;

      if (enablePanDownToClose && shouldClose) {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
          runOnJS(onClose)();
        });
        backdropAnimatedOpacity.value = withTiming(0, { duration: 300 });
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT - sheetHeight, {
          damping: 50,
          stiffness: 400,
        });
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const rBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropAnimatedOpacity.value,
  }));

  if (!visible) {
    return null;
  }

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPress={onClose}>
          <Animated.View style={[styles.backdrop, rBackdropStyle]} />
        </Pressable>

        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.sheet, rBottomSheetStyle, getSheetContainerStyles(theme)]}>
            <View style={getHandleContainerStyles(theme)}>
              <View style={styles.handle} />
            </View>

            <View style={styles.content}>{children}</View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};
