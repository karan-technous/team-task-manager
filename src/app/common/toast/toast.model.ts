export interface Toast {
  id: number;

  title: string;

  description?: string;

  duration?: number;

  removing?: boolean;

  type?: 'success' | 'error' | 'warning' | 'pending';

  position?: ToastPosition;

  action?: {
    label: string;
    handler: () => void;
  };
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastOptions {
  description?: string;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    handler: () => void;
  };
}
