import { Component, input, output, computed, effect } from '@angular/core';
import { Toast } from './toast.model';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  toast = input.required<Toast>();

  index = input<number>(0);

  total = input<number>(0);

  hovered = input<boolean>(false);

  close = output<void>();

  timer: any;

  constructor() {
    effect(() => {
      const t = this.toast();

      if (!t.duration) return;

      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.close.emit();
      }, t.duration);
    });
  }

  offset = computed(() => {
    // vertical layout
    if (this.total() <= 3) {
      return this.index() * 72;
    }

    // expanded on hover
    if (this.hovered()) {
      return this.index() * 72;
    }

    // stacked layout
    return this.index() * 12;
  });

  scale = computed(() => {
    if (this.total() <= 3) return 1;

    if (this.hovered()) return 1;

    return 1 - this.index() * 0.05;
  });
}
