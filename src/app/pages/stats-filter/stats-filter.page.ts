import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-stats-filter',
  templateUrl: './stats-filter.page.html',
  styleUrls: ['./stats-filter.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatsFilterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
