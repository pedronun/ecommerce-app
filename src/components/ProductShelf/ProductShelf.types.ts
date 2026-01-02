import { ViewProps } from 'react-native';
import { Product } from '@typings/product';

export type ProductShelfVariant = 'default' | 'compact' | 'featured';

export interface ProductShelfProps extends ViewProps {
  /**
   * Dados do produto a ser exibido
   */
  product: Product;

  /**
   * Variante do layout do shelf
   * - default: Layout padrão com imagem grande
   * - compact: Layout compacto para listagens
   * - featured: Layout em destaque com mais informações
   */
  variant?: ProductShelfVariant;

  /**
   * Callback ao pressionar o card do produto
   */
  onPress?: () => void;

  /**
   * Callback ao pressionar o botão de adicionar ao carrinho
   */
  onAddToCart?: () => void;

  /**
   * Callback ao pressionar o botão de favoritar
   */
  onFavorite?: () => void;

  /**
   * Indica se o produto está favoritado
   */
  isFavorite?: boolean;

  /**
   * Mostrar botão de adicionar ao carrinho
   */
  showAddToCart?: boolean;

  /**
   * Mostrar botão de favoritar
   */
  showFavoriteButton?: boolean;

  /**
   * Mostrar badge de desconto (se houver)
   */
  showDiscount?: boolean;

  /**
   * Mostrar categoria do produto
   */
  showCategory?: boolean;
}
