import { ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /**
   * Componente ou render function customizado para exibir quando há erro.
   * Recebe o erro e uma função para resetar o estado.
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  /**
   * Callback chamado quando um erro é capturado.
   * Útil para reportar para serviços de monitoramento (ex.: Sentry).
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
