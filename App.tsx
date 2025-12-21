import { ToastProvider } from '@design-system/components/Toast';
import { ThemeProvider } from '@design-system/theme/ThemeContext';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider initialMode="light">
        <ToastProvider>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello World</Text>
          </View>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
