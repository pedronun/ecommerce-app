import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import type { Product } from '@typings/product';

import type { CartContextData, CartItem } from './CartContext.types';

/**
 * Chave para armazenar o carrinho no AsyncStorage
 */
const CART_STORAGE_KEY = '@ecommerce:cart';

/**
 * Contexto do carrinho
 */
export const CartContext = createContext<CartContextData | null>(null);

/**
 * Provider do contexto do carrinho
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Carrega os itens do carrinho do AsyncStorage
   */
  const loadCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartItem[];
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Salva os itens do carrinho no AsyncStorage
   */
  const saveCart = useCallback(async (cartItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, []);

  /**
   * Adiciona um produto ao carrinho
   */
  const addToCart = useCallback(
    async (product: Product, quantity: number = 1) => {
      try {
        setItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id);

          let newItems: CartItem[];

          if (existingItemIndex >= 0) {
            // Produto já existe, atualiza a quantidade
            newItems = [...prevItems];
            newItems[existingItemIndex] = {
              ...newItems[existingItemIndex],
              quantity: newItems[existingItemIndex].quantity + quantity,
            };
          } else {
            // Produto novo, adiciona ao carrinho
            newItems = [...prevItems, { product, quantity }];
          }

          saveCart(newItems);
          return newItems;
        });
      } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        throw error;
      }
    },
    [saveCart]
  );

  /**
   * Remove um produto do carrinho
   */
  const removeFromCart = useCallback(
    async (productId: number) => {
      try {
        setItems((prevItems) => {
          const newItems = prevItems.filter((item) => item.product.id !== productId);
          saveCart(newItems);
          return newItems;
        });
      } catch (error) {
        console.error('Erro ao remover produto do carrinho:', error);
        throw error;
      }
    },
    [saveCart]
  );

  /**
   * Atualiza a quantidade de um produto no carrinho
   */
  const updateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      try {
        if (quantity <= 0) {
          // Se a quantidade for 0 ou negativa, remove o item
          await removeFromCart(productId);
          return;
        }

        setItems((prevItems) => {
          const newItems = prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          saveCart(newItems);
          return newItems;
        });
      } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        throw error;
      }
    },
    [removeFromCart, saveCart]
  );

  /**
   * Limpa todos os itens do carrinho
   */
  const clearCart = useCallback(async () => {
    try {
      setItems([]);
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }, []);

  /**
   * Verifica se um produto está no carrinho
   */
  const isInCart = useCallback(
    (productId: number) => {
      return items.some((item) => item.product.id === productId);
    },
    [items]
  );

  /**
   * Obtém a quantidade de um produto no carrinho
   */
  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = items.find((item) => item.product.id === productId);
      return item?.quantity ?? 0;
    },
    [items]
  );

  /**
   * Calcula a quantidade total de itens no carrinho
   */
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  /**
   * Calcula o valor total do carrinho
   */
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items]);

  /**
   * Carrega o carrinho ao montar o componente
   */
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const contextValue = useMemo(
    () => ({
      items,
      isLoading,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    }),
    [
      items,
      isLoading,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isInCart,
      getItemQuantity,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
