import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton} from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';
import { AchievementsService } from 'src/app/services/achievements.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, IonButton]
})
export class FilterPage implements ViewWillEnter {
  champions: Champion[] = [];
  n: number = 0;

  attribute!: string;
  attributeDisplay!: string;
  value!: string;
  choices: Champion[] = [];

  possibleAttributes: string[] = ["gender", "role", "species", "resource", "range", "region", "year"];
  possibleAttributesDisplay: string[] = ["le genre", "le rôle", "l'espèce", "la ressource", "la portée", "la région", "l'année de sortie"];
  possibleAttributesStats: string[] = ["Genre", "Rôle", "Espèce", "Ressource", "Portée", "Région", "Année de sortie"];

  selectedChoices: boolean[] = [];
  correctIndexes: boolean[] = [];

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
    const attribute_data = await this.storage.get("filter_attribute_data");

    if(!attribute_data) {
      this.resetGame();
    }

    else {
      const attribute_display_data = await this.storage.get("filter_attribute_display_data");
      const value_data = await this.storage.get("filter_value_data");
      const choices_data = await this.storage.get("filter_choices_data");
      this.attributeDisplay = attribute_display_data;
      this.value = value_data;
      this.choices = choices_data;
      this.attribute = attribute_data;
    }
  }

  resetGame() {
    const randomIndex = Math.floor(Math.random() * this.possibleAttributes.length);
    this.attribute = this.possibleAttributes[randomIndex];
    this.storage.set("filter_attribute_data", this.attribute);

    this.attributeDisplay = this.possibleAttributesDisplay[randomIndex];
    this.storage.set("filter_attribute_display_data", this.attributeDisplay);

    const rawValues = this.champions.map(c => (c as any)[this.attribute]);
    const flattened = rawValues.reduce((acc: string[], val: any) => {
      if (Array.isArray(val)) {
        return acc.concat(val);
      } else {
        return acc.concat([val]);
      }
    }, []);
    const randomIndex2 = Math.floor(Math.random() * flattened.length);
    this.value = flattened[randomIndex2];
    this.storage.set("filter_value_data", this.value);

    const shuffledChampions = [...this.champions].sort(() => Math.random() - 0.5);
    this.choices = shuffledChampions.slice(0, 9);
    this.storage.set("filter_choices_data", this.choices);

    this.selectedChoices = Array(this.choices.length).fill(false);
    this.showResult = false;
    this.won = false;
  }

  toggleSelection(index: number) {
    if(!this.showResult) {
      this.selectedChoices[index] = !this.selectedChoices[index];
    }
  }

  async submit() {
    this.showResult = true;

    const correctIndexes = this.choices.map((champ, i) => {
      const attr = (champ as any)[this.attribute];
      return Array.isArray(attr) ? attr.includes(this.value) : attr === this.value;
    });

    this.correctIndexes = correctIndexes;

    const userCorrect = correctIndexes.every((val, i) => val === this.selectedChoices[i]);

    this.won = userCorrect;

    if(this.won) {
      this.ach.increment("filter_enjoyer");

      let streak_data = await this.storage.get("filter_streak_data") || 0;
      streak_data++;
      this.storage.set("filter_streak_data", streak_data);

      this.ach.updateValue("filter_streak", streak_data);

      this.ach.increment("winner");

      const now = new Date();
      const hour = now.getHours();
      if (hour === 13) {
        this.ach.increment("coffee_break");
      }
    }
    else {
      this.storage.set("filter_streak_data", 0);

      const selected = this.selectedChoices;
      const correct = this.correctIndexes;

      const allCorrectUnselected = correct.every((isCorrect, i) => !isCorrect || !selected[i]);
      const allWrongSelected = correct.every((isCorrect, i) => isCorrect || selected[i]);
      
      const isExactlyWrong = allCorrectUnselected && allWrongSelected;

      if (isExactlyWrong) {
        this.ach.increment("filter_error");
      }
    }
    
    this.ach.increment("marathonian");

    this.saveStats();
    this.clearData();
  }

  getResultClass(index: number): string {
    if (!this.showResult) {
      return this.selectedChoices[index] ? "selected" : "";
    }

    const isSelected = this.selectedChoices[index];
    const isCorrect = this.correctIndexes[index];

    if (isSelected && isCorrect) {
      return "true-positive";
    } else if (!isSelected && !isCorrect) {
      return "";
    } else if (isSelected && !isCorrect) {
      return "false-positive";
    } else if (!isSelected && isCorrect) {
      return "false-negative";
    }

    return "";
  }

  async saveStats() {
    let gameState: string = "";

    if(this.won) {
      gameState = "Gagné";
    }
    else {
      gameState = "Perdu";
    }

    let attributeStats: string = "";

    for(let i = 0; i<this.possibleAttributes.length; i++) {
      if(this.possibleAttributes[i] === this.attribute) {
        attributeStats = this.possibleAttributesStats[i];
        break;
      }
    }

    let answer: string[] = [];
    let user_answer: string[] = [];

    for(let i = 0; i<this.choices.length; i++) {
      if(this.correctIndexes[i]) {
        answer.push(this.choices[i].name);
      }
      if(this.selectedChoices[i]) {
        user_answer.push(this.choices[i].name);
      }
    }

    let stat: any = {
      gameState: gameState,
      attribute: attributeStats,
      value: this.value,
      answer: answer,
      user_answer: user_answer,
      date: this.formatDate(new Date())
    }

    let filter_stats_data = await this.storage.get("filter_stats_data") || [];
    filter_stats_data.push(stat);
    this.storage.set("filter_stats_data", filter_stats_data);
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
    this.storage.remove("filter_attribute_data");
    this.storage.remove("filter_attribute_display_data");
    this.storage.remove("filter_choices_data");
    this.storage.remove("filter_value_data");
  }
}
