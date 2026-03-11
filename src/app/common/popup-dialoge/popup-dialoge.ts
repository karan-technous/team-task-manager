import { Component, input, output } from '@angular/core';
import { IconButton } from '../icon-button/icon-button';

@Component({
  selector: 'app-popup-dialoge',
  imports: [IconButton],
  templateUrl: './popup-dialoge.html',
  styleUrl: './popup-dialoge.scss',
})
export class PopupDialoge {
  open = input<boolean>(false);

  close = output<void>();

  closeDialog() {
    this.close.emit();
  }
}
