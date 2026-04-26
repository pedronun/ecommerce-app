import api from '@services/api';
import { Product } from '@typings/product';

export const getSearch = async (query: string) => {
  const response = await api.get<Product[]>(`/products?title=${encodeURIComponent(query)}`);
  return response.data;
};
