import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats-button',
  templateUrl: './stats-button.component.html',
  styleUrls: ['./stats-button.component.scss'],
})
export class StatsButtonComponent {
  title = input.required<string>();
  path = input.required<string>();

  constructor(private router: Router) { }

  goTo() {
    this.router.navigate(["stats-" + this.path()]);
  }
}
