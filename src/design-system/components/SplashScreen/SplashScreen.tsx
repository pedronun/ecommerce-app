import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
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
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationEnd,
  backgroundColor = '#0066FF',
  iconColor = '#FFFFFF',
  showLogo = true,
}) => {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);
  const styles = createStyles(iconColor, backgroundColor);

  useEffect(() => {
    // Animação de entrada do logo
    fadeAnim.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    scaleAnim.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });

    // Animação de rotação - repetições suficientes para cobrir toda a duração
    rotateAnim.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      5,
      false
    );

    // Animação de pulso - repetições suficientes para cobrir toda a duração
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      5,
      false
    );

    // Animação dos círculos expansivos
    circleScale.value = withRepeat(
      withTiming(2, {
        duration: 1500,
        easing: Easing.out(Easing.cubic),
      }),
      6,
      false
    );

    circleOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 200 }),
        withTiming(0, { duration: 1300, easing: Easing.out(Easing.cubic) })
      ),
      6,
      false
    );

    // Animação da barra de progresso - cresce de 0 a 100%
    progressWidth.value = withTiming(1, {
      duration: 2500,
      easing: Easing.inOut(Easing.cubic),
    });

    // Animação de saída - inicia após 2.2s e dura 800ms para transição suave
    const fadeOutTimeout = setTimeout(() => {
      fadeAnim.value = withTiming(0, {
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
      });
    }, 2200);

    // Chama onAnimationEnd após a animação de saída completa
    const endTimeout = setTimeout(() => {
      if (onAnimationEnd) {
        runOnJS(onAnimationEnd)();
      }
    }, 3100);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(endTimeout);
    };
  }, [
    circleOpacity,
    circleScale,
    fadeAnim,
    onAnimationEnd,
    progressWidth,
    pulseAnim,
    rotateAnim,
    scaleAnim,
  ]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scaleAnim.value * pulseAnim.value },
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
            <View style={[styles.logoInner, { backgroundColor: iconColor }]}>
              <MaterialIcons name="shopping-cart" size={60} color={backgroundColor} />
            </View>
          </Animated.View>
        )}

        {/* Barra de progresso animada */}
        <Animated.View style={[styles.progressContainer, containerStyle]}>
          <Animated.View
            style={[styles.progressBar, progressStyle, { backgroundColor: iconColor }]}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};
