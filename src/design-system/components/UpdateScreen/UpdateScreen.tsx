import React, { useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { UpdateScreenProps } from './UpdateScreen.types';
import { createStyles } from './UpdateScreen.styles';

export const UpdateScreen: React.FC<UpdateScreenProps> = React.memo(
  ({
    progress,
    status,
    backgroundColor = '#0066FF',
    iconColor = '#FFFFFF',
    updatingText = 'Atualizando...',
    checkingText = 'Verificando atualização...',
  }) => {
    const pulseAnim = useSharedValue(1);
    const circleScale = useSharedValue(0);
    const circleOpacity = useSharedValue(0);
    const progressWidth = useSharedValue(0);

    // Memoizar estilos para evitar recriação em cada render
    const styles = useMemo(
      () => createStyles(backgroundColor, iconColor),
      [backgroundColor, iconColor]
    );

    const displayIconColor = useMemo(() => iconColor ?? '#FFFFFF', [iconColor]);
    const displayBgColor = useMemo(() => backgroundColor ?? '#0066FF', [backgroundColor]);

    // Iniciar animações apenas uma vez
    useEffect(() => {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

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

      // Cleanup: cancelar animações quando o componente desmontar
      return () => {
        cancelAnimation(pulseAnim);
        cancelAnimation(circleScale);
        cancelAnimation(circleOpacity);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Executar apenas uma vez na montagem

    // Atualizar apenas o progresso quando mudar
    useEffect(() => {
      progressWidth.value = withTiming(progress, {
        duration: 500,
        easing: Easing.inOut(Easing.cubic),
      });
    }, [progress, progressWidth]);

    const iconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: pulseAnim.value }],
    }));

    const circle1Style = useAnimatedStyle(() => ({
      transform: [{ scale: circleScale.value }],
      opacity: circleOpacity.value,
    }));

    const circle2Style = useAnimatedStyle(() => ({
      transform: [{ scale: circleScale.value * 0.8 }],
      opacity: circleOpacity.value * 0.7,
    }));

    const progressStyle = useAnimatedStyle(() => ({
      width: `${progressWidth.value * 100}%`,
    }));

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconGroup}>
            <Animated.View style={[styles.circle, circle1Style]} />
            <Animated.View style={[styles.circle, circle2Style, { borderWidth: 3 }]} />
            <Animated.View style={[styles.iconContainer, iconStyle]}>
              <View style={styles.iconInner}>
                <MaterialIcons name="system-update" size={60} color={displayBgColor} />
              </View>
            </Animated.View>
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.statusText, { color: displayIconColor }]}>
              {status === 'UPDATING' ? updatingText : checkingText}
            </Text>
            {progress > 0 && (
              <Text style={[styles.progressText, { color: displayIconColor }]}>
                {Math.round(progress * 100)}%
              </Text>
            )}
          </View>

          {progress > 0 && (
            <View style={styles.progressContainer}>
              <Animated.View style={[styles.progressBar, progressStyle]} />
            </View>
          )}
        </View>
      </View>
    );
  }
);

UpdateScreen.displayName = 'UpdateScreen';
