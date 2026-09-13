import { ErrorInfo } from 'react';
import {
  getCrashlytics,
  log,
  recordError,
  setAttributes,
  setUserId,
} from '@react-native-firebase/crashlytics';

import { User } from '@typings/user';

const reportIfNeeded = (action: string, error: unknown) => {
  if (__DEV__) {
    console.warn(`[Crashlytics] Falha ao ${action}`, error);
  }
};

export const logCrashlytics = (message: string) => {
  try {
    log(getCrashlytics(), message);
  } catch (error) {
    reportIfNeeded('registrar log', error);
  }
};

export const recordCrashlyticsError = (error: Error, jsErrorName?: string) => {
  try {
    recordError(getCrashlytics(), error, jsErrorName);
  } catch (caught) {
    reportIfNeeded('registrar erro', caught);
  }
};

export const identifyCrashlyticsUser = async (user: Pick<User, 'id' | 'role'> | null) => {
  try {
    const crashlytics = getCrashlytics();

    if (!user) {
      await setUserId(crashlytics, '');
      return;
    }

    await Promise.all([
      setUserId(crashlytics, String(user.id)),
      setAttributes(crashlytics, { role: user.role }),
    ]);
  } catch (error) {
    reportIfNeeded('identificar usuário', error);
  }
};

export const handleReactError = (error: Error, errorInfo: ErrorInfo) => {
  if (errorInfo.componentStack) {
    logCrashlytics(errorInfo.componentStack);
  }

  recordCrashlyticsError(error, 'ErrorBoundary');
};
