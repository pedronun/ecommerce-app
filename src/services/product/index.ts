import api from '@services/api';
import { Product } from '@typings/product';

export const getProductBySlug = async (slug: string) => {
  const response = await api.get<Product>(`/products/slug/${slug}`);
  return response.data;
};

export interface GetProductsByCategoryParams {
  categoryId: number;
  limit?: number;
  offset?: number;
}

export const getProductsByCategory = async ({
  categoryId,
  limit = 20,
  offset = 0,
}: GetProductsByCategoryParams) => {
  const response = await api.get<Product[]>(
    `/categories/${categoryId}/products?limit=${limit}&offset=${offset}`
  );
  return response.data;
};
