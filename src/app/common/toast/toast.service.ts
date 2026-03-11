import { Injectable, signal } from '@angular/core';
import { Toast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private id = 0;

  toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: ++this.id,
      duration: 3000,
      removing: false,
      ...toast,
    };

    this.toasts.update((list) => [newToast, ...list]);
  }

  remove(id: number) {
    this.toasts.update((list) => list.map((t) => (t.id === id ? { ...t, removing: true } : t)));

    setTimeout(() => {
      this.toasts.update((list) => list.filter((t) => t.id !== id));
    }, 350);
  }
}
