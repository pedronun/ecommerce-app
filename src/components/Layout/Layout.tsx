import { Header } from '@components/Header';
import { useTheme } from '@design-system/theme/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['bottom']}>
      <Header />
      {children}
    </SafeAreaView>
  );
}
