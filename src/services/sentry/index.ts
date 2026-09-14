import * as Sentry from '@sentry/react-native';

import { env } from '@config/env';
import { User } from '@typings/user';

const reportIfNeeded = (action: string, error: unknown) => {
  if (__DEV__) {
    console.warn(`[Sentry] Falha ao ${action}`, error);
  }
};

Sentry.init({
  dsn: env.sentry.dsn,
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  tracesSampleRate: 1.0,
  integrations: [Sentry.mobileReplayIntegration()],
  spotlight: __DEV__,
});

export const wrapRoot = Sentry.wrap;

export const logSentry = (message: string) => {
  try {
    Sentry.addBreadcrumb({
      category: 'app',
      level: 'info',
      message,
    });
    Sentry.logger.info(message);
  } catch (error) {
    reportIfNeeded('registrar log', error);
  }
};

export const recordSentryError = (error: Error, jsErrorName?: string) => {
  try {
    Sentry.captureException(error, {
      tags: jsErrorName ? { error_name: jsErrorName } : undefined,
    });
    Sentry.logger.error(error.message, jsErrorName ? { error_name: jsErrorName } : undefined);
  } catch (caught) {
    reportIfNeeded('registrar erro', caught);
  }
};

export const identifySentryUser = (user: Pick<User, 'id' | 'role'> | null) => {
  try {
    if (!user) {
      Sentry.setUser(null);
      Sentry.setTag('role', '');
      return;
    }

    Sentry.setUser({ id: String(user.id) });
    Sentry.setTag('role', user.role);
  } catch (error) {
    reportIfNeeded('identificar usuário', error);
  }
};
