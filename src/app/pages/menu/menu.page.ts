import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

import { ChampionsService } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';

import { ButtonComponent } from 'src/app/components/button/button.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ButtonComponent]
})
export class MenuPage implements ViewWillEnter {
  championNames: string[] = this.champ.champions.map(c => c.name);

  constructor(private router: Router,
              private champ: ChampionsService,
              private storage: StorageService) { }

  ionViewWillEnter(): void {
    this.shuffleArray(this.championNames);

    this.initStatsData();
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  goToClassic() {
    this.router.navigate(["classic"]);
  }

  async initStatsData() {
    const classic_stats_data = await this.storage.get("classic_stats_data");
    const characteristics_stats_data = await this.storage.get("characteristics_stats_data");
    const filter_stats_data = await this.storage.get("filter_stats_data");
    const chronology_stats_data = await this.storage.get("chronology_stats_data");

    if(!classic_stats_data) {
      this.storage.set("classic_stats_data", []);
    }

    if(!characteristics_stats_data) {
      this.storage.set("characteristics_stats_data", []);
    }

    if(!filter_stats_data) {
      this.storage.set("filter_stats_data", []);
    }

    if(!chronology_stats_data) {
      this.storage.set("chronology_stats_data", []);
    }
  }
}
