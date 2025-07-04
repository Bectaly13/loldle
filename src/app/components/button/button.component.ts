import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  title = input.required<string>();
  subtitle = input.required<string>();
  path = input.required<string>();

  constructor(private router: Router) { }

  goTo() {
    this.router.navigate([this.path()]);
  }
}
