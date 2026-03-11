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

  layout = input<'stacked' | 'vertical'>('vertical');

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

  private readonly itemOffset = 72;
  private readonly stackOffset = 12;
  private readonly stackScaleStep = 0.05;

  offset = computed(() => {
    const stacked = this.layout() === 'stacked';

    // vertical layout (default + on hover)
    if (!stacked) {
      return this.index() * this.itemOffset;
    }

    // stacked layout
    return this.index() * this.stackOffset;
  });

  scale = computed(() => {
    const stacked = this.layout() === 'stacked';
    if (!stacked) return 1;

    return Math.max(0.85, 1 - this.index() * this.stackScaleStep);
  });

  zIndex = computed(() => 100 - this.index());
}
