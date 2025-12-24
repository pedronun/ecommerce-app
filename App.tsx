import { ToastProvider } from '@design-system/components/Toast';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes/routes';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider initialMode="light">
        <ToastProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
