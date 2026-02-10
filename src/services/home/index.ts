import { strapiApi } from '@services/api';
import { IHome } from '@typings/home';

export const getHomeContent = async () => {
  const response = await strapiApi.get<IHome>(`/home`);
  return response.data;
};
