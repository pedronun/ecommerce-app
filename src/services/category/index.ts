import api from '@services/api';
import { Category } from '@typings/product';

export const getCategories = async () => {
  const response = await api.get<Category[]>(`/categories`);
  return response.data;
};
