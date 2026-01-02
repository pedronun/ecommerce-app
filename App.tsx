import { ToastProvider } from '@design-system/components/Toast';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackRoutes } from './src/routes/routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider initialMode="light">
        <ToastProvider>
          <NavigationContainer>
            <StackRoutes />
          </NavigationContainer>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
