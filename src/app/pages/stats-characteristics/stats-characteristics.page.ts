import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-stats-characteristics',
  templateUrl: './stats-characteristics.page.html',
  styleUrls: ['./stats-characteristics.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatsCharacteristicsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
