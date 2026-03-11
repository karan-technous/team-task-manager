import { Injectable, signal } from '@angular/core';
import { Toast, ToastOptions, ToastPosition } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private id = 0;
  private readonly exitMs = 300;

  toasts = signal<Toast[]>([]);
  position = signal<ToastPosition>('top-right');

  show(toast: Omit<Toast, 'id'>) {
    const newToast: Toast = {
      id: ++this.id,
      duration: 3000,
      removing: false,
      ...toast,
    };

    if (newToast.position) {
      this.position.set(newToast.position);
    }

    this.toasts.update((list) => [newToast, ...list]);
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

  success(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('success', title, description, options);
  }

  error(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('error', title, description, options);
  }

  warning(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('warning', title, description, options);
  }

  pending(title: string, description?: string, options?: ToastOptions) {
    this.createTyped('pending', title, description, options);
  }

  private createTyped(
    type: NonNullable<Toast['type']>,
    title: string,
    description?: string,
    options?: ToastOptions,
  ) {
    this.show({
      title,
      description: description ?? options?.description,
      duration: options?.duration,
      position: options?.position,
      action: options?.action,
      type,
    });
  }
}
