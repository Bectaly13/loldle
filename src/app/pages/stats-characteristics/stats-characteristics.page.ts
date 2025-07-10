import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';

import { StorageService } from 'src/app/services/storage.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-stats-characteristics',
  templateUrl: './stats-characteristics.page.html',
  styleUrls: ['./stats-characteristics.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent]
})
export class StatsCharacteristicsPage implements ViewWillEnter {
  stats: any[] = [];
  totalCount: number = 0;
  wonCount: number = 0;
  lostCount: number = 0;

  constructor(private storage: StorageService) { }

  ionViewWillEnter(): void {
    this.getStats();
  }

  async getStats() {
    this.stats = await this.storage.get("characteristics_stats_data") || [];

    this.totalCount = this.stats.length;
    const wonGames = this.stats.filter(stat => stat.gameState === "Gagné");
    this.wonCount = wonGames.length;
    this.lostCount = this.totalCount - this.wonCount;
  }
}
