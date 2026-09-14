import { useEffect } from 'react';
import { HotUpdater } from '@hot-updater/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { env } from '@config/env';
import { NetworkStatusListener } from '@components/NetworkStatusListener';
import { CartProvider, SearchProvider } from '@contexts/index';
import { UserProvider } from '@contexts/UserContext/UserContext';
import { ErrorBoundary } from '@design-system/components/ErrorBoundary';
import { Toast } from '@design-system/components/Toast';
import { UpdateScreen } from '@design-system/components/UpdateScreen';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { handleReactError, logCrashlytics } from '@services/crashlytics';
import { StackRoutes } from './src/routes/routes';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://6bf1fedea2ad31f66cc81346b429e23a@o4512081791614976.ingest.us.sentry.io/4512081796464640',

  sendDefaultPii: true,

  enableLogs: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  spotlight: __DEV__,
});

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    logCrashlytics('App mounted');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ThemeProvider initialMode="light">
        <ErrorBoundary onError={handleReactError}>
          <NetworkStatusListener />
          <UserProvider>
            <SearchProvider>
              <CartProvider>
                <QueryClientProvider client={queryClient}>
                  <NavigationContainer>
                    <StackRoutes />
                    <Toast />
                  </NavigationContainer>
                </QueryClientProvider>
              </CartProvider>
            </SearchProvider>
          </UserProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const AppWithHotUpdater = HotUpdater.wrap({
  baseURL: env.hotUpdater.url,
  updateMode: 'auto',
  updateStrategy: 'appVersion',
  fallbackComponent: ({ progress, status }) => (
    <UpdateScreen progress={progress} status={status} />
  ),
})(App);

function Root(_props: Record<string, unknown>) {
  return <AppWithHotUpdater />;
}

export default Sentry.wrap(Root);
