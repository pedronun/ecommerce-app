import { ViewStyle } from 'react-native';

export interface CarouselProps<T = unknown> {
  /** Lista de itens a exibir no carrossel */
  data: T[];
  /** Função que renderiza cada item (item, index) => ReactNode */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Ativa rotação automática dos slides */
  autoplay?: boolean;
  /** Intervalo em ms entre cada slide no autoplay (padrão: 4000) */
  autoplayInterval?: number;
  /** Exibe indicadores (bolinhas) de página */
  showDots?: boolean;
  /** Largura de cada slide (padrão: largura da tela) */
  slideWidth?: number;
  /** Espaçamento horizontal entre slides */
  gap?: number;
  /** Callback ao mudar o slide visível */
  onSlideChange?: (index: number) => void;
  /** Estilos opcionais */
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}
