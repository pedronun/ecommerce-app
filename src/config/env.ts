/**
 * Configuração centralizada de variáveis de ambiente.
 *
 * Todas as variáveis EXPO_PUBLIC_* são embutidas no bundle em build time
 * e ficam visíveis no binário. Para segredos de alta criticidade em produção,
 * utilize um backend/proxy intermediário em vez de acessar a API diretamente.
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;

  if (!value && __DEV__) {
    console.warn(
      `[Config] Variável de ambiente "${key}" não está definida. ` +
        'Crie um arquivo .env.local baseado no .env.example.'
    );
  }

  return value ?? '';
};

export const env = {
  /** API pública de produtos e autenticação (Escuela JS) */
  api: {
    baseURL: getEnvVar('EXPO_PUBLIC_API_URL', 'https://api.escuelajs.co/api/v1'),
  },
  /** CMS Strapi — conteúdo da home */
  strapi: {
    /** URL base do Strapi, sem barra final. Ex.: http://localhost:1337 */
    baseURL: getEnvVar('EXPO_PUBLIC_STRAPI_URL', 'http://localhost:1337'),
    /** Token de acesso à API do Strapi */
    apiToken: getEnvVar('EXPO_PUBLIC_STRAPI_TOKEN'),
  },
  /** Hot Updater — OTA updates */
  hotUpdater: {
    url: getEnvVar('EXPO_PUBLIC_HOT_UPDATER_URL'),
  },
} as const;
