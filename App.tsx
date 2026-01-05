import { CartProvider, SearchProvider } from '@contexts/index';
import { ToastProvider } from '@design-system/components/Toast';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackRoutes } from './src/routes/routes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider initialMode="light">
        <ToastProvider>
          <SearchProvider>
            <CartProvider>
              <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                  <StackRoutes />
                </NavigationContainer>
              </QueryClientProvider>
            </CartProvider>
          </SearchProvider>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
