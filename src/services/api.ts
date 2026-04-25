import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  isNetworkError: boolean;
  isTimeout: boolean;
}

export interface ApiLogger {
  error: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
}

const consoleLogger: ApiLogger = {
  error: (message, meta) => console.error('[API Error]', message, meta ?? ''),
  warn: (message, meta) => console.warn('[API Warn]', message, meta ?? ''),
};

let logger: ApiLogger = consoleLogger;

export const setApiLogger = (customLogger: ApiLogger) => {
  logger = customLogger;
};

const buildApiError = (error: AxiosError): ApiError => {
  const isNetworkError = !error.response;
  const isTimeout = error.code === 'ECONNABORTED';

  if (isTimeout) {
    return {
      message: 'A requisição excedeu o tempo limite. Tente novamente.',
      isNetworkError: false,
      isTimeout: true,
    };
  }

  if (isNetworkError) {
    return {
      message: 'Sem conexão com o servidor. Verifique sua internet.',
      isNetworkError: true,
      isTimeout: false,
    };
  }

  const status = error.response?.status;

  const statusMessages: Record<number, string> = {
    400: 'Requisição inválida.',
    401: 'Não autorizado. Faça login novamente.',
    403: 'Acesso negado.',
    404: 'Recurso não encontrado.',
    422: 'Dados inválidos enviados ao servidor.',
    429: 'Muitas requisições. Aguarde um momento.',
    500: 'Erro interno do servidor. Tente novamente mais tarde.',
    502: 'Servidor indisponível. Tente novamente mais tarde.',
    503: 'Serviço temporariamente indisponível.',
  };

  const message = status
    ? (statusMessages[status] ?? `Erro inesperado (${status}).`)
    : 'Erro inesperado.';

  return { message, status, isNetworkError: false, isTimeout: false };
};

const handleResponseError = (error: AxiosError): Promise<never> => {
  const apiError = buildApiError(error);

  const logLevel = apiError.status && apiError.status < 500 ? 'warn' : 'error';
  logger[logLevel](apiError.message, {
    status: apiError.status,
    url: error.config?.url,
    method: error.config?.method,
    isNetworkError: apiError.isNetworkError,
    isTimeout: apiError.isTimeout,
  });

  return Promise.reject(apiError);
};

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1/',
  timeout: 10000,
});

api.interceptors.response.use((response: AxiosResponse) => response, handleResponseError);

export const strapiApi = axios.create({
  baseURL: 'http://localhost:1337/api/',
  timeout: 10000,
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
  (response: AxiosResponse) => response.data,
  handleResponseError
);

export default api;
