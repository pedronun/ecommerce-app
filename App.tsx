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

export default HotUpdater.wrap({
  baseURL: env.hotUpdater.url,
  updateMode: 'auto',
  updateStrategy: 'appVersion',
  fallbackComponent: ({ progress, status }) => <UpdateScreen progress={progress} status={status} />,
})(App);
