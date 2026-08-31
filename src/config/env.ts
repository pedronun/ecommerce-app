/**
 * Configuração centralizada de variáveis de ambiente.
 *
 * Todas as variáveis EXPO_PUBLIC_* são embutidas no bundle em build time
 * e ficam visíveis no binário. Para segredos de alta criticidade em produção,
 * utilize um backend/proxy intermediário em vez de acessar a API diretamente.
 */

/**
 * O `babel-preset-expo` só substitui referências estáticas a
 * `process.env.EXPO_PUBLIC_*` por literais em build time. Acesso com chave
 * computada (`process.env[key]`) não é transformado e resolve para `undefined`
 * no bundle de produção, por isso cada variável é lida estaticamente abaixo.
 */
const resolveEnvVar = (key: string, value: string | undefined, fallback?: string): string => {
  const resolved = value || fallback;

  if (!resolved && __DEV__) {
    console.warn(
      `[Config] Variável de ambiente "${key}" não está definida. ` +
        'Crie um arquivo .env.local baseado no .env.example.'
    );
  }

  return resolved ?? '';
};

export const env = {
  /** API pública de produtos e autenticação (Escuela JS) */
  api: {
    baseURL: resolveEnvVar(
      'EXPO_PUBLIC_API_URL',
      process.env.EXPO_PUBLIC_API_URL,
      'https://api.escuelajs.co/api/v1'
    ),
  },
  /** CMS Strapi — conteúdo da home */
  strapi: {
    /** URL base do Strapi, sem barra final. Ex.: http://localhost:1337 */
    baseURL: resolveEnvVar(
      'EXPO_PUBLIC_STRAPI_URL',
      process.env.EXPO_PUBLIC_STRAPI_URL,
      'http://localhost:1337'
    ),
    /** Token de acesso à API do Strapi */
    apiToken: resolveEnvVar('EXPO_PUBLIC_STRAPI_TOKEN', process.env.EXPO_PUBLIC_STRAPI_TOKEN),
  },
  /** Hot Updater — OTA updates */
  hotUpdater: {
    url: resolveEnvVar('EXPO_PUBLIC_HOT_UPDATER_URL', process.env.EXPO_PUBLIC_HOT_UPDATER_URL),
  },
} as const;
