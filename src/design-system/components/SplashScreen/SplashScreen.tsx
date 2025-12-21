import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyles } from './SplashScreen.styles';

interface SplashScreenProps {
  onAnimationEnd?: () => void;
  backgroundColor?: string;
  iconColor?: string;
  showLogo?: boolean;
  minSplashDuration?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationEnd,
  backgroundColor = '#0066FF',
  iconColor = '#FFFFFF',
  showLogo = true,
  minSplashDuration = 4000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.3);
  const rotateAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const styles = createStyles(iconColor, backgroundColor);

  useEffect(() => {
    // Calcula os tempos baseado no minSplashDuration
    const fadeOutDuration = 800;
    const fadeInDuration = 800;
    const fadeOutStart = minSplashDuration - fadeOutDuration;
    const progressDuration = minSplashDuration - fadeOutDuration - 200;

    // Calcula repetições para que a rotação termine exatamente em 0 graus
    const rotationDuration = minSplashDuration - fadeOutDuration - 200;
    const rotationRepeats = Math.floor(fadeOutStart / rotationDuration);

    // Animação de entrada do logo
    fadeAnim.value = withTiming(1, {
      duration: fadeInDuration,
      easing: Easing.out(Easing.cubic),
    });

    scaleAnim.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    });

    // Animação de rotação - número exato de repetições para terminar em 0 graus
    rotateAnim.value = withRepeat(
      withTiming(360, {
        duration: rotationDuration,
        easing: Easing.linear,
      }),
      rotationRepeats,
      false
    );

    // Animação de pulso infinita
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Animação dos círculos expansivos infinita
    circleScale.value = withRepeat(
      withTiming(2, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      }),
      -1,
      false
    );

    circleOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 200 }),
        withTiming(0, { duration: 1300, easing: Easing.out(Easing.cubic) })
      ),
      -1,
      false
    );

    // Animação da barra de progresso - cresce de 0 a 100%
    progressWidth.value = withTiming(1, {
      duration: progressDuration,
      easing: Easing.inOut(Easing.cubic),
    });

    // Animação de saída
    const fadeOutTimeout = setTimeout(() => {
      // Cancela animações em loop (exceto rotação que já terminou)
      cancelAnimation(pulseAnim);
      cancelAnimation(circleScale);
      cancelAnimation(circleOpacity);

      // Inicia o fade out com callback
      fadeAnim.value = withTiming(
        0,
        {
          duration: fadeOutDuration,
          easing: Easing.inOut(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            // Esconde o conteúdo completamente após fade out
            runOnJS(setIsVisible)(false);
            // Chama o callback após um pequeno delay
            if (onAnimationEnd) {
              runOnJS(onAnimationEnd)();
            }
          }
        }
      );
    }, fadeOutStart);

    return () => {
      clearTimeout(fadeOutTimeout);
      // Cancela todas as animações na limpeza
      cancelAnimation(fadeAnim);
      cancelAnimation(scaleAnim);
      cancelAnimation(rotateAnim);
      cancelAnimation(pulseAnim);
      cancelAnimation(circleScale);
      cancelAnimation(circleOpacity);
      cancelAnimation(progressWidth);
    };
  }, [
    circleOpacity,
    circleScale,
    fadeAnim,
    minSplashDuration,
    onAnimationEnd,
    progressWidth,
    pulseAnim,
    rotateAnim,
    scaleAnim,
    setIsVisible,
  ]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotateAnim.value, [0, 360], [0, 360])}deg`,
      },
    ],
  }));

  const circle1Style = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleOpacity.value,
  }));

  const circle2Style = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value * 0.8 }],
    opacity: circleOpacity.value * 0.7,
  }));

  const circle3Style = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value * 0.6 }],
    opacity: circleOpacity.value * 0.5,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isVisible && (
        <Animated.View style={[styles.content, containerStyle]}>
          {/* Círculos expansivos de fundo */}
          <Animated.View style={[styles.circle, circle1Style, { borderColor: iconColor }]} />
          <Animated.View
            style={[styles.circle, circle2Style, { borderColor: iconColor, borderWidth: 3 }]}
          />
          <Animated.View
            style={[styles.circle, circle3Style, { borderColor: iconColor, borderWidth: 2 }]}
          />

          {/* Logo/Ícone principal */}
          {showLogo && (
            <Animated.View style={[styles.logoContainer, logoStyle]}>
              <Animated.View
                style={[styles.logoInner, { backgroundColor: iconColor }]}
                needsOffscreenAlphaCompositing
              >
                <MaterialIcons name="shopping-cart" size={60} color={backgroundColor} />
              </Animated.View>
            </Animated.View>
          )}

          {/* Barra de progresso animada */}
          <Animated.View style={styles.progressContainer}>
            <Animated.View
              style={[styles.progressBar, progressStyle, { backgroundColor: iconColor }]}
            />
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};
