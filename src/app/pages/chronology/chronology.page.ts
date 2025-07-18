import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton } from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';
import { AchievementsService } from 'src/app/services/achievements.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-chronology',
  templateUrl: './chronology.page.html',
  styleUrls: ['./chronology.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, IonButton]
})
export class ChronologyPage implements ViewWillEnter {
  champions: Champion[] = [];
  n: number = 0;

  slots: (Champion | null)[] = [null, null, null, null, null];
  choices: Champion[] = [];

  showResult: boolean = false;
  won: boolean = false;

  constructor(private champ: ChampionsService,
              private storage: StorageService,
              private ach: AchievementsService) { }

  ionViewWillEnter(): void {
    this.getChampionsData();

    this.startGame();    
  }

  getChampionsData() {
    this.champions = this.champ.champions;
    this.n = this.champions.length;
  }

  async startGame() {
    const choices_data = await this.storage.get("chronology_choices_data");

    if(!choices_data) {
      this.resetGame();
    }

    else {
      this.choices = choices_data;
    }
  }

  resetGame() {
    const shuffledChampions = [...this.champions].sort(() => Math.random() - 0.5);
    this.choices = shuffledChampions.slice(0, 3);
    this.storage.set("chronology_choices_data", this.choices);

    this.slots = Array(this.choices.length).fill(null);
    this.showResult = false;
    this.won = false;
  }

  moveLeft(index: number) {
    if (index > 0) {
      [this.choices[index - 1], this.choices[index]] = [this.choices[index], this.choices[index - 1]];
    }
  }

  moveRight(index: number) {
    if (index < this.choices.length - 1) {
      [this.choices[index], this.choices[index + 1]] = [this.choices[index + 1], this.choices[index]];
    }
  }

  async submit() {
    this.showResult = true;

    const years = this.choices.map(champ => champ.year);
    const sorted = [...years].sort((a, b) => a - b);
    this.won = JSON.stringify(years) === JSON.stringify(sorted);

    if(this.won) {
      this.ach.increment("chronology_enjoyer");

      let streak_data = await this.storage.get("chronology_streak_data") || 0;
      streak_data++;
      this.storage.set("chronology_streak_data", streak_data);

      this.ach.updateValue("chronology_streak", streak_data);
    }
    else {
      this.storage.set("chronology_streak_data", 0);
    }

    this.saveStats();
    this.clearData();
  }

  async saveStats() {
    let gameState: string = "";

    if(this.won) {
      gameState = "Gagné";
    }
    else {
      gameState = "Perdu";
    }

    let stat: any = {
      gameState: gameState,
      user_answer: this.choices.map(champ => champ.name),
      answer: [...this.choices].sort((a, b) => a.year - b.year).map(champ => champ.name),
      date: this.formatDate(new Date())
    }

    let chronology_stats_data = await this.storage.get("chronology_stats_data") || [];
    chronology_stats_data.push(stat);
    this.storage.set("chronology_stats_data", chronology_stats_data);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  clearData() {
    this.storage.remove("chronology_choices_data");
  }
}
