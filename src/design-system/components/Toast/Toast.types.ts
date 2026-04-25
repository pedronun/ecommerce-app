import mitt from 'mitt';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
}

export interface ToastPayload {
  title: string;
  message: string;
  type: ToastType;
  duration: number;
}

type ToastEvents = {
  show: ToastPayload;
  hide: void;
};

export const toastEmitter = mitt<ToastEvents>();

export const toast = {
  show: ({ type = 'info', duration = 3500, title = '', message }: ToastOptions) => {
    toastEmitter.emit('show', { type, duration, title, message });
  },
  hide: () => {
    toastEmitter.emit('hide');
  },
};

export interface ToastContextValue {
  show: (options: ToastOptions) => void;
  hide: () => void;
}

export interface ToastComponentProps extends ToastOptions {
  visible: boolean;
  onHide: () => void;
}
