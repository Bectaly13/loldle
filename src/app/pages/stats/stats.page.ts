import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { StatsButtonComponent } from 'src/app/components/stats-button/stats-button.component';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, StatsButtonComponent]
})
export class StatsPage {

  constructor() { }
}
