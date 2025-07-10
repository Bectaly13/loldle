import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';

import { StorageService } from 'src/app/services/storage.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { DeleteStatsButtonComponent } from 'src/app/components/delete-stats-button/delete-stats-button.component';

@Component({
  selector: 'app-stats-classic',
  templateUrl: './stats-classic.page.html',
  styleUrls: ['./stats-classic.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, DeleteStatsButtonComponent]
})
export class StatsClassicPage implements ViewWillEnter {
  stats: any[] = [];
  wonCount = 0;
  abandonedCount = 0;
  totalCount = 0;
  averageTries: string = "-";

  constructor(private storage: StorageService) { }

  ionViewWillEnter(): void {
    this.getStats();
  }

  async getStats() {
    this.stats = await this.storage.get("classic_stats_data") || [];

    this.totalCount = this.stats.length;
    const wonGames = this.stats.filter(stat => stat.gameState === "Gagné");
    this.wonCount = wonGames.length;
    this.abandonedCount = this.totalCount - this.wonCount;
    
    if (wonGames.length > 0) {
      const totalTries = wonGames.reduce((acc, stat) => acc + stat.tries, 0);
      this.averageTries = (totalTries / wonGames.length).toFixed(2);
    }
  }
}
