/**
 * Header Component Types
 */

import type { ViewStyle } from 'react-native';

export interface HeaderProps {
  /**
   * Callback executado ao pressionar o ícone de notificações
   */
  onNotificationPress?: () => void;

  /**
   * Número de notificações não lidas (exibido no badge)
   */
  notificationCount?: number;

  /**
   * Cor de fundo do header
   */
  backgroundColor?: string;

  /**
   * Cor dos ícones
   */
  iconColor?: string;

  /**
   * Tamanho dos ícones
   */
  iconSize?: number;

  /**
   * Estilos customizados para o container
   */
  style?: ViewStyle;

  /**
   * ID para testes
   */
  testID?: string;
}
