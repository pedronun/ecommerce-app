import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.escuelajs.co/api/v1/`,
});

export const strapiApi = axios.create({
  baseURL: `http://localhost:1337/api/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer c4da2a7e83197709e0225ab1d917a9268b8b9838a140c441a28ac184354c2ffd957d67a454336254af19135fc78be7addd80b35f7ce00295f4d16d64807c9b8f3e738cc4bbbd22ab6f936ea3600e200d602ca881741edab327696e0ff232f097be0cc20f76ccf1e1cf97828cb75b922913dbc3e923f3212e92ca28d91908aa2c',
  },
  params: {
    pLevel: 5,
  },
});

strapiApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
