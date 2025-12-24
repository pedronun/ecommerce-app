/**
 * Tipos do componente TabBar
 */

import { ViewStyle } from 'react-native';

export interface TabBarItem {
  /**
   * Identificador único da tab
   */
  key: string;
  /**
   * Label da tab
   */
  label: string;
  /**
   * Nome do ícone (MaterialIcons por padrão)
   */
  icon: string;
  /**
   * Família do ícone (opcional)
   */
  iconFamily?:
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Ionicons'
    | 'Feather'
    | 'AntDesign'
    | 'Entypo';
  /**
   * Badge count (opcional)
   */
  badge?: number;
}

export interface TabBarProps {
  /**
   * Array de items da tab bar
   */
  items: TabBarItem[];
  /**
   * Key da tab ativa
   */
  activeKey: string;
  /**
   * Callback quando uma tab é pressionada
   */
  onTabPress: (key: string) => void;
  /**
   * Mostra labels (padrão: true)
   */
  showLabels?: boolean;
  /**
   * Cor customizada para o item ativo
   */
  activeColor?: string;
  /**
   * Cor customizada para o item inativo
   */
  inactiveColor?: string;
  /**
   * Estilo customizado
   */
  style?: ViewStyle;
}
