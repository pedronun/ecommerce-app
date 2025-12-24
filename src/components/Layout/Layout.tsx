import { Header } from '@components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Header />
      {children}
    </SafeAreaView>
  );
}
