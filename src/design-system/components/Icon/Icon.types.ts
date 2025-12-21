/**
 * Icon Types
 * Define tipos e interfaces para o componente Icon
 */

import type { ComponentProps } from 'react';
import * as VectorIcons from '@expo/vector-icons';

/**
 * Famílias de ícones disponíveis
 */
export type IconFamily = keyof typeof VectorIcons;

/**
 * Props base do Icon
 */
export interface IconProps {
  /**
   * Família de ícones a ser usada
   * @default 'MaterialIcons'
   */
  family?: IconFamily;

  /**
   * Nome do ícone
   * @example 'home', 'shopping-cart', 'user'
   */
  name: string;

  /**
   * Tamanho do ícone em pixels
   * @default 24
   */
  size?: number;

  /**
   * Cor do ícone
   * @default theme.colors.text
   */
  color?: string;

  /**
   * Estilo adicional
   */
  style?: ComponentProps<typeof VectorIcons.MaterialIcons>['style'];

  /**
   * Callback ao pressionar o ícone
   */
  onPress?: () => void;

  /**
   * Se o ícone está desabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * ID para testes
   */
  testID?: string;
}

/**
 * Atalhos para famílias de ícones mais comuns
 */
export type MaterialIconName = ComponentProps<typeof VectorIcons.MaterialIcons>['name'];
export type MaterialCommunityIconName = ComponentProps<
  typeof VectorIcons.MaterialCommunityIcons
>['name'];
export type FontAwesomeIconName = ComponentProps<typeof VectorIcons.FontAwesome>['name'];
export type FontAwesome5IconName = ComponentProps<typeof VectorIcons.FontAwesome5>['name'];
export type IonIconName = ComponentProps<typeof VectorIcons.Ionicons>['name'];
export type FeatherIconName = ComponentProps<typeof VectorIcons.Feather>['name'];
export type AntDesignIconName = ComponentProps<typeof VectorIcons.AntDesign>['name'];
