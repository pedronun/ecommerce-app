import api from '@services/api';
import { Product } from '@typings/product';

export const getProductBySlug = async (slug: string) => {
  const response = await api.get<Product>(`/products/slug/${slug}`);
  return response.data;
};
