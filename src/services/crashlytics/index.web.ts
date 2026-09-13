import { ErrorInfo } from 'react';

import { User } from '@typings/user';

export const logCrashlytics = (_message: string) => {
  // Crashlytics é nativo (iOS/Android). No web não há SDK equivalente.
};

export const recordCrashlyticsError = (_error: Error, _jsErrorName?: string) => {
  // Crashlytics é nativo (iOS/Android). No web não há SDK equivalente.
};

export const identifyCrashlyticsUser = async (_user: Pick<User, 'id' | 'role'> | null) => {
  // Crashlytics é nativo (iOS/Android). No web não há SDK equivalente.
};

export const handleReactError = (_error: Error, _errorInfo: ErrorInfo) => {
  // Crashlytics é nativo (iOS/Android). No web não há SDK equivalente.
};
