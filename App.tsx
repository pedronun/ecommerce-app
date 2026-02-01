import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CartProvider, SearchProvider } from '@contexts/index';
import { UserProvider } from '@contexts/UserContext/UserContext';
import { ToastProvider } from '@design-system/components/Toast';
import { UpdateScreen } from '@design-system/components/UpdateScreen';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { HotUpdater } from '@hot-updater/react-native';
import { StackRoutes } from './src/routes/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#121212' }}>
      <ThemeProvider initialMode="light">
        <ToastProvider>
          <UserProvider>
            <SearchProvider>
              <CartProvider>
                <QueryClientProvider client={queryClient}>
                  <NavigationContainer>
                    <StackRoutes />
                  </NavigationContainer>
                </QueryClientProvider>
              </CartProvider>
            </SearchProvider>
          </UserProvider>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default HotUpdater.wrap({
  baseURL: 'https://hot-updater-vjk2qqtqfa-uc.a.run.app/api/check-update',
  updateMode: 'auto',
  updateStrategy: 'appVersion',
  fallbackComponent: ({ progress, status }) => <UpdateScreen progress={progress} status={status} />,
})(App);
