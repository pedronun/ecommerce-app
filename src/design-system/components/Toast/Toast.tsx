/**
 * Componente Toast
 * Notificações temporárias que aparecem na tela
 */

import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from '../../theme/ThemeContext';
import { Text } from '../Text';
import { ToastOptions, ToastContextValue, ToastComponentProps } from './Toast.types';
import {
  styles,
  TOAST_HEIGHT,
  getToastBackgroundColor,
  getToastIcon,
  WHITE_COLOR,
} from './Toast.styles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback((toastOptions: ToastOptions) => {
    setToast(toastOptions);
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setToast(null);
    }, 300);
  }, []);

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {toast && <ToastComponent {...toast} visible={isVisible} onHide={hide} />}
    </ToastContext.Provider>
  );
};

const ToastComponent: React.FC<ToastComponentProps> = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'top',
  action,
  visible,
  onHide,
}) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(position === 'top' ? -TOAST_HEIGHT : TOAST_HEIGHT);
  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  const hideToast = useCallback(() => {
    translateY.value = withTiming(
      position === 'top' ? -TOAST_HEIGHT : TOAST_HEIGHT,
      { duration: 300 },
      () => {
        runOnJS(onHide)();
      }
    );
  }, [onHide, position, translateY]);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 300,
      });

      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => {
          clearTimeout(timer);
        };
      }
    } else {
      hideToast();
    }
  }, [visible, duration, hideToast, translateY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SCREEN_WIDTH * 0.3 || Math.abs(event.velocityX) > 500) {
        translateX.value = withTiming(
          event.velocityX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          { duration: 200 },
          () => {
            runOnJS(hideToast)();
          }
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const rToastStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
  }));

  const backgroundColor = getToastBackgroundColor(type, theme);
  const icon = getToastIcon(type);

  return (
    <View
      style={[styles.container, position === 'top' ? styles.topPosition : styles.bottomPosition]}
      pointerEvents="box-none"
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.toast,
            {
              backgroundColor,
              borderRadius: theme.radius.lg,
              ...theme.shadows.lg,
            },
            rToastStyle,
          ]}
        >
          <View style={styles.iconContainer}>
            <Text variant="h5">{icon}</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text variant="body2" style={{ color: WHITE_COLOR }} numberOfLines={2}>
              {message}
            </Text>
          </View>
          {action && (
            <View style={styles.actionContainer}>
              <Text
                variant="button"
                style={{ color: WHITE_COLOR, fontSize: 14 }}
                onPress={action.onPress}
              >
                {action.label}
              </Text>
            </View>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};
