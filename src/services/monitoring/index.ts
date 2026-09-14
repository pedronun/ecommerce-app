import { ErrorInfo } from 'react';

import {
  identifyCrashlyticsUser,
  logCrashlytics,
  recordCrashlyticsError,
} from '@services/crashlytics';
import { identifySentryUser, logSentry, recordSentryError } from '@services/sentry';
import { User } from '@typings/user';

export const logAppEvent = (message: string) => {
  logCrashlytics(message);
  logSentry(message);
};

export const recordAppError = (error: Error, jsErrorName?: string) => {
  recordCrashlyticsError(error, jsErrorName);
  recordSentryError(error, jsErrorName);
};

export const identifyAppUser = async (user: Pick<User, 'id' | 'role'> | null) => {
  identifySentryUser(user);
  await identifyCrashlyticsUser(user);
};

export const handleReactError = (error: Error, errorInfo: ErrorInfo) => {
  if (errorInfo.componentStack) {
    logAppEvent(errorInfo.componentStack);
  }

  recordAppError(error, 'ErrorBoundary');
};
