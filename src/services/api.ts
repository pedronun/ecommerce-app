import axios, { AxiosError, AxiosResponse } from 'axios';

import { env } from '@config/env';

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
  baseURL: `${env.strapi.baseURL}/api/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.strapi.apiToken}`,
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
