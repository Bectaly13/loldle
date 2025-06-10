import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonItem, IonList, IonInput, IonGrid, IonRow, IonCol, IonButton, AlertController } from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-classic',
  templateUrl: './classic.page.html',
  styleUrls: ['./classic.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonItem, IonList, IonInput, IonGrid, IonRow, IonCol, IonButton]
})
export class ClassicPage implements ViewWillEnter {
  champions: Champion[] = [];
  n: number = 0;

  answer!: Champion;
  history: Champion[] = [];

  query: string = "";
  filteredChampions: Champion[] = [];

  won: boolean = false;

  constructor(private champ: ChampionsService,
              private alert: AlertController,
              private storage: StorageService) { }

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

  selectChampion(champion: Champion) {
    this.query = "";
    this.filteredChampions = [];

    this.history.unshift(champion);
    this.storage.set("classic_history_data", this.history);

    if (champion.name === this.answer.name) {
      this.won = true;
      this.storage.remove("classic_answer_data");
      this.storage.set("classic_history_data", []);
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
          handler: (() => {this.resetGame();})
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
}
