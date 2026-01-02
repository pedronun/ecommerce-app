import type { Product } from '@typings/product';

export interface CartItem {
  /**
   * Produto no carrinho
   */
  product: Product;

  /**
   * Quantidade do produto no carrinho
   */
  quantity: number;
}

/**
 * Interface para o contexto do carrinho
 */
export interface CartContextData {
  /**
   * Lista de itens no carrinho
   */
  items: CartItem[];

  /**
   * Indica se o carrinho está carregando os dados do AsyncStorage
   */
  isLoading: boolean;

  /**
   * Quantidade total de itens no carrinho
   */
  totalItems: number;

  /**
   * Valor total do carrinho
   */
  totalPrice: number;

  /**
   * Adiciona um produto ao carrinho
   * Se o produto já existir, incrementa a quantidade
   */
  addToCart: (product: Product, quantity?: number) => Promise<void>;

  /**
   * Remove um produto do carrinho
   */
  removeFromCart: (productId: number) => Promise<void>;

  /**
   * Atualiza a quantidade de um produto no carrinho
   */
  updateQuantity: (productId: number, quantity: number) => Promise<void>;

  /**
   * Limpa todos os itens do carrinho
   */
  clearCart: () => Promise<void>;

  /**
   * Verifica se um produto está no carrinho
   */
  isInCart: (productId: number) => boolean;

  /**
   * Obtém a quantidade de um produto no carrinho
   */
  getItemQuantity: (productId: number) => number;
}
