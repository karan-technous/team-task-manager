import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../common/button/button';
import { IconInput } from '../../common/icon-input/icon-input';
import { PopupDialoge } from '../../common/popup-dialoge/popup-dialoge';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, Button, IconInput, PopupDialoge],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  open = false;
  readonly metrics = [
    { label: 'Active Projects', value: '4' },
    { label: 'Open Tasks', value: '28' },
    { label: 'Completed This Week', value: '16' },
    { label: 'Team Members Online', value: '9' },
  ];
  buttonClick() {
    console.log('button');
  }

  searchUsers(v: string) {
    console.log('the final value = ', v);
  }

  readonly upcoming = [
    { task: 'Sprint planning for mobile app', owner: 'Aisha', due: 'Today, 4:30 PM' },
    { task: 'QA review for billing module', owner: 'Ravi', due: 'Tomorrow, 11:00 AM' },
    { task: 'Design handoff: workspace settings', owner: 'Mina', due: 'Mar 11, 3:00 PM' },
  ];
}
