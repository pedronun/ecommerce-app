/**
 * Icon Component
 * Wrapper para @expo/vector-icons com suporte a múltiplas famílias de ícones
 */

import React from 'react';
import { Pressable } from 'react-native';
import * as VectorIcons from '@expo/vector-icons';
import type { IconProps } from './Icon.types';
import { styles } from './Icon.styles';
import { useTheme } from '../../theme/ThemeContext';

/**
 * Componente Icon
 *
 * @example
 * // Ícone básico
 * <Icon name="home" />
 *
 * @example
 * // Ícone com família customizada
 * <Icon family="MaterialCommunityIcons" name="cart" size={32} color="blue" />
 *
 * @example
 * // Ícone pressionável
 * <Icon name="settings" onPress={() => console.log('Pressed')} />
 */
export const Icon: React.FC<IconProps> = ({
  family = 'MaterialIcons',
  name,
  size = 24,
  color,
  style,
  onPress,
  disabled = false,
  testID,
}) => {
  const { theme } = useTheme();

  // Define a cor padrão se não fornecida
  const iconColor = color || theme.colors.text.primary;

  // Obtém o componente de ícone da família especificada
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = VectorIcons[family] as React.ComponentType<any>;

  // Verifica se a família de ícones existe
  if (!IconComponent) {
    console.warn(`Família de ícone "${family}" não encontrada. Usando MaterialIcons.`);
    const FallbackIcon = VectorIcons.MaterialIcons;
    return (
      <FallbackIcon
        name="help-outline"
        size={size}
        color={iconColor}
        style={[style, disabled && styles.disabled]}
        testID={testID}
      />
    );
  }

  // Renderiza o ícone
  const iconElement = (
    <IconComponent
      name={name}
      size={size}
      color={iconColor}
      style={[style, disabled && styles.disabled]}
      testID={testID}
    />
  );

  // Se houver onPress, envolve em Pressable
  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        style={styles.pressable}
        disabled={disabled}
        testID={testID ? `${testID}-pressable` : undefined}
      >
        {iconElement}
      </Pressable>
    );
  }

  return iconElement;
};
