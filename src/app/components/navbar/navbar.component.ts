import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  title = input.required<string>();
  buttons: string[] = ["menu", "classic", "learn", "stats"];
  currentRoute: string = "";

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.replace("/", "");
    });
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }
}
