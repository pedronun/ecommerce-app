import { useContext } from 'react';

import { CartContextData } from './CartContext.types';
import { CartContext } from './CartContext';

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }

  return context;
}
