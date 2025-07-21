import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';

import { StorageService } from 'src/app/services/storage.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { DeleteStatsButtonComponent } from 'src/app/components/delete-stats-button/delete-stats-button.component';

@Component({
  selector: 'app-stats-chronology',
  templateUrl: './stats-chronology.page.html',
  styleUrls: ['./stats-chronology.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, DeleteStatsButtonComponent]
})
export class StatsChronologyPage implements ViewWillEnter {
  stats: any[] = [];
  data!: any;
  totalCount: number = 0;
  wonCount: number = 0;
  lostCount: number = 0;

  constructor(private storage: StorageService) { }

  ionViewWillEnter(): void {
    this.getStats();
  }

  async getStats() {
    this.stats = await this.storage.get("chronology_stats_data") || [];
    this.data = await this.storage.get("chronology_data") || {won: 0, lost: 0};
    
    this.totalCount = this.data["won"] + this.data["lost"];
    this.wonCount = this.data["won"];
    this.lostCount = this.data["lost"];
  }
}
