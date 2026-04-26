import React, { Component, ErrorInfo, useMemo } from 'react';
import { View, ScrollView } from 'react-native';

import { Button } from '../Button';
import { Text } from '../Text';
import { Icon } from '../Icon';
import { useTheme } from '../../theme/ThemeContext';
import { createStyles } from './ErrorBoundary.styles';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon
          family="MaterialCommunityIcons"
          name="alert-circle-outline"
          size={48}
          color={theme.colors.error}
        />
      </View>

      <View style={styles.textContainer}>
        <Text variant="h3" align="center">
          Algo inesperado aconteceu
        </Text>
        <Text variant="body1" align="center" color={theme.colors.text.secondary}>
          Ocorreu um erro na aplicação. Tente recarregar a tela ou reinicie o app caso o problema
          persista.
        </Text>
      </View>

      {__DEV__ && (
        <View style={styles.devBox}>
          <Text variant="caption" color={theme.colors.error}>
            {error.name}: {error.message}
          </Text>
        </View>
      )}

      <Button variant="primary" size="md" onPress={onReset}>
        Tentar novamente
      </Button>
    </ScrollView>
  );
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (!hasError || !error) {
      return children;
    }

    if (fallback) {
      return typeof fallback === 'function' ? fallback(error, this.reset) : fallback;
    }

    return <ErrorFallback error={error} onReset={this.reset} />;
  }
}
