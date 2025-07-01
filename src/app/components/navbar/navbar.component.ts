import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title = input.required<string>();
  buttons: string[] = ["menu", "classic", "learn", "stats"]

  constructor(private router: Router) { }

  goTo(page: string) {
    this.router.navigate([page]);
  }
}
