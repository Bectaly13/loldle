import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule]
})
export class NavbarComponent {
  title = input.required<string>();
  buttons: string[] = ["menu", "classic", "characteristics", "filter", "chronology", "learn", "stats"];
  currentRoute: string = "";

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace("/", "");
    });
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  splitButtons(): string[][] {
    const a = this.buttons.slice(0, 4);
    const b = this.buttons.slice(4, 7);
    return [a, b];
  }
}
