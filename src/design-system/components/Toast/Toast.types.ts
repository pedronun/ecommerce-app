export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export interface ToastContextValue {
  show: (options: ToastOptions) => void;
  hide: () => void;
}

export interface ToastComponentProps extends ToastOptions {
  visible: boolean;
  onHide: () => void;
}

