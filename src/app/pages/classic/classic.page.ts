import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonItem, IonList, IonInput, IonGrid, IonRow, IonCol, IonButton, AlertController } from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';
import { AchievementsService } from 'src/app/services/achievements.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.page.html',
  styleUrls: ['./classic.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonList, IonInput, IonGrid, IonRow, IonCol, IonButton, NavbarComponent]
})
export class ClassicPage implements ViewWillEnter {
  @ViewChild("contentRef", {static:false}) content!: IonContent;

  champions: Champion[] = [];
  n: number = 0;

  answer!: Champion;
  history: Champion[] = [];

  query: string = "";
  filteredChampions: Champion[] = [];

  won: boolean = false;

  constructor(private champ: ChampionsService,
              private alert: AlertController,
              private storage: StorageService,
              private ach: AchievementsService) { }

  ionViewWillEnter(): void {
    this.getChampionsData();
    
    this.startGame();
  }

  onInputChange() {
    const q = this.removeAccents(this.query);
    if (q.length === 0) {
      this.filteredChampions = [];
    } else {
      this.filteredChampions = this.champions.filter(champion =>
        !this.history.some(c => c.name === champion.name) &&
        this.removeAccents(champion.name).startsWith(q)
      );
    }
  }

  async selectChampion(champion: Champion) {
    this.query = "";
    this.filteredChampions = [];

    this.history.unshift(champion);
    this.storage.set("classic_history_data", this.history);

    if (champion.name === this.answer.name) {
      this.ach.increment("classic_enjoyer");

      if(this.history.length <= 3) {
        this.ach.increment("classic_expert");

        if(this.history.length == 1) {
          this.ach.increment("classic_god");
        }
      }

      this.ach.increment("marathonian");
      this.ach.increment("winner");

      this.ach.checkTime();

      await this.ach.updateDailyStreak();
      await this.ach.updateDailyPlayCount();
      await this.ach.updateDailyWinCount();

      this.won = true;
      this.content.scrollToTop(500);
      this.saveStats();
      this.clearData();
    }
  }

  submitByEnter() {
    if (this.filteredChampions.length > 0) {
      this.selectChampion(this.filteredChampions[0]);
    }
  }

  removeAccents(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  getAttributeColor(userAttr: any, answerAttr: any): string {
    if (!Array.isArray(userAttr)) {
      if (userAttr === answerAttr) return 'green';
      return 'red';
    }

    const userArray = userAttr as string[];
    const answerArray = answerAttr as string[];

    const isEqual =
      userArray.length === answerArray.length &&
      userArray.every(val => answerArray.includes(val));

    if (isEqual) return 'green';

    const hasOverlap = userArray.some(val => answerArray.includes(val));
    return hasOverlap ? 'orange' : 'red';
  }

  resetGame() {
    this.query = "";
    this.filteredChampions = [];

    this.history = [];
    this.storage.set("classic_history_data", this.history);

    const index: number = Math.floor(Math.random() * this.n);
    this.answer = this.champions[index];
    this.storage.set("classic_answer_data", this.answer);

    this.won = false;
  }

  async confirmReset() {
    const alert = await this.alert.create({
      header: "Réinitialiser la partie ?",
      message: "Toute progression sera perdue.",
      buttons: [
        {
          text: "Annuler",
          role: "cancel"
        },
        {
          text: "Confirmer",
          handler: (() => {
            this.saveStats();
            this.clearData();
            this.resetGame();})
        }
      ]
    });

    await alert.present();
  }

  async startGame() {
    const answer_data = await this.storage.get("classic_answer_data");

    if(!answer_data) {
      this.resetGame();
    }

    else {
      const history_data = await this.storage.get("classic_history_data");
      this.history = history_data;
      this.answer = answer_data;
    }
  }

  getChampionsData() {
    this.champions = this.champ.champions;
    this.n = this.champions.length;
  }

  async saveStats() {
    let gameState: string = "";

    if(this.won) {
      gameState = "Gagné";
    }
    else {
      gameState = "Abandonné";
    }

    let stat: any = {
      gameState: gameState,
      tries: this.history.length,
      answer: this.answer.name,
      date: this.formatDate(new Date())
    }

    let classic_stats_data = await this.storage.get("classic_stats_data") || [];
    classic_stats_data.push(stat);
    this.storage.set("classic_stats_data", classic_stats_data);
  }

  clearData() {
    this.storage.remove("classic_answer_data");
    this.storage.remove("classic_history_data");
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
}
