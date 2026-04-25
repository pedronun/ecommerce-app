import { useTheme } from '@design-system/theme/ThemeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon';
import { Text } from '../Text';
import {
  ANIMATION_DURATION,
  getToastColors,
  getToastIcon,
  getToastStyles,
  SLIDE_OFFSET,
} from './Toast.styles';
import { toastEmitter, ToastPayload } from './Toast.types';

export const Toast: React.FC = () => {
  const { theme } = useTheme();
  const styles = getToastStyles(theme);
  const [visible, setVisible] = useState(false);
  const [payload, setPayload] = useState<ToastPayload>({
    title: '',
    message: '',
    type: 'info',
    duration: 3500,
  });
  const { bg, indicator, textColor } = getToastColors(payload.type, theme);

  const translateY = useRef(new Animated.Value(SLIDE_OFFSET)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const hide = useCallback(() => {
    clearTimer();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SLIDE_OFFSET,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => setVisible(false));
  }, [translateY, opacity]);

  const show = useCallback(
    (data: ToastPayload) => {
      clearTimer();

      const runAnimation = () => {
        translateY.setValue(SLIDE_OFFSET);
        opacity.setValue(0);

        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            bounciness: 5,
            speed: 14,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
          }),
        ]).start();

        timerRef.current = setTimeout(hide, data.duration);
      };

      if (visible) {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: SLIDE_OFFSET,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setPayload(data);
          runAnimation();
        });
      } else {
        setPayload(data);
        setVisible(true);
        runAnimation();
      }
    },
    [translateY, opacity, hide, visible]
  );

  useEffect(() => {
    toastEmitter.on('show', show);
    toastEmitter.on('hide', hide);

    return () => {
      toastEmitter.off('show', show);
      toastEmitter.off('hide', hide);
    };
  }, [show, hide]);

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: bg }, { transform: [{ translateY }], opacity }]}
    >
      <View style={[styles.indicator, { backgroundColor: indicator }]} />
      <TouchableOpacity style={styles.content} onPress={hide} activeOpacity={0.85}>
        <View>
          <Icon name={getToastIcon(payload.type)} size={24} color={textColor} />
        </View>
        <View style={styles.textContainer}>
          {!!payload.title && (
            <Text variant="body1" style={[styles.title, { color: textColor }]} numberOfLines={1}>
              {payload.title}
            </Text>
          )}
          <Text variant="body1" style={[styles.message, { color: textColor }]} numberOfLines={2}>
            {payload.message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
