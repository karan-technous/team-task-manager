import { Injectable, signal } from '@angular/core';
import { Toast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private id = 0;
  private readonly maxVisible = 3;
  private readonly exitMs = 300;

  toasts = signal<Toast[]>([]);

  show(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: ++this.id,
      duration: 3000,
      removing: false,
      ...toast,
    };

    this.toasts.update((list) => [newToast, ...list]);
    this.trimOverflow();
  }

  remove(id: number) {
    let alreadyRemoving = false;

    this.toasts.update((list) =>
      list.map((t) => {
        if (t.id !== id) return t;
        if (t.removing) {
          alreadyRemoving = true;
          return t;
        }
        return { ...t, removing: true };
      }),
    );

    if (alreadyRemoving) return;

    setTimeout(() => {
      this.toasts.update((list) => list.filter((t) => t.id !== id));
    }, this.exitMs);
  }

  private trimOverflow() {
    const overflow = this.toasts().slice(this.maxVisible);
    if (!overflow.length) return;
    overflow.forEach((toast) => this.remove(toast.id));
  }
}
