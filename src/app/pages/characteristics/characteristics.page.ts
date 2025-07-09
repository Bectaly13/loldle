import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonList, IonItem, IonCheckbox, IonLabel, IonButton } from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-characteristics',
  templateUrl: './characteristics.page.html',
  styleUrls: ['./characteristics.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, IonList, IonItem, IonCheckbox, IonLabel, IonButton]
})
export class CharacteristicsPage implements ViewWillEnter {
  @ViewChild("contentRef", {static: false}) content!: IonContent;

  champions: Champion[] = [];
  n: number = 0;

  champion!: Champion;
  attribute!: string;
  attributeDisplay!: string;
  answer!: string[];
  choices!: string[];

  possibleAttributes: string[] = ["gender", "role", "species", "resource", "range", "region", "year"];
  possibleAttributesDisplay: string[] = ["le genre", "le rôle", "l'espèce", "la ressource", "la portée", "la région", "l'année de sortie"];
  possibleAttributesStats: string[] = ["Genre", "Rôle", "Espèce", "Ressource", "Portée", "Région", "Année de sortie"];

  selectedChoices: boolean[] = [];

  showResult: boolean = false;
  won: boolean = false;

  constructor(private champ: ChampionsService,
              private storage: StorageService) { }

  ionViewWillEnter(): void {
    this.getChampionsData();

    this.startGame();
  }

  getChampionsData() {
    this.champions = this.champ.champions;
    this.n = this.champions.length;
  }

  async startGame() {
    const champion_data = await this.storage.get("characteristics_champion_data");

    if(!champion_data) {
      this.resetGame();
    }

    else {
      const attribute_data = await this.storage.get("characteristics_attribute_data");
      const attribute_display_data = await this.storage.get("characteristics_attribute_display_data");
      const answer_data = await this.storage.get("characteristics_answer_data");
      const choices_data = await this.storage.get("characteristics_choices_data");
      this.attribute = attribute_data;
      this.attributeDisplay = attribute_display_data;
      this.answer = answer_data;
      this.choices = choices_data;
      this.champion = champion_data;
    }
  }

  resetGame() {
    const index: number = Math.floor(Math.random() * this.n);
    this.champion = this.champions[index];
    this.storage.set("characteristics_champion_data", this.champion);

    const randomIndex = Math.floor(Math.random() * this.possibleAttributes.length);
    this.attribute = this.possibleAttributes[randomIndex];
    this.storage.set("characteristics_attribute_data", this.attribute);

    this.attributeDisplay = this.possibleAttributesDisplay[randomIndex];
    this.storage.set("characteristics_attribute_display_data", this.attributeDisplay);

    const rawAnswer = (this.champion as any)[this.attribute];
    this.answer = Array.isArray(rawAnswer) ? rawAnswer : [rawAnswer];
    this.storage.set("characteristics_answer_data", this.answer);

    const rawValues = this.champions.map(c => (c as any)[this.attribute]);
    const flattened = rawValues.reduce((acc: string[], val: any) => {
      if (Array.isArray(val)) {
        return acc.concat(val);
      } else {
        return acc.concat([val]);
      }
    }, []);
    this.choices = [...new Set(flattened)].sort((a, b) =>
      a.localeCompare(b, "fr", {sensitivity: "base"})
    );
    this.storage.set("characteristics_choices_data", this.choices);

    this.selectedChoices = new Array(this.choices.length).fill(false);
    this.showResult = false;
    this.won = false;
  }

  toggleCheckbox(index: number) {
    this.selectedChoices[index] = !this.selectedChoices[index];
  }

  onCheckboxChange(index: number, event: any) {
    this.selectedChoices[index] = event.detail.checked;
  }

  submit() {
    const selected = this.choices.filter((_, index) => this.selectedChoices[index]);
    selected.sort();
    const correct = [...this.answer].sort();

    this.won = selected.length === correct.length && selected.every((val, i) => val === correct[i]);
    this.showResult = true;

    this.scrollToTop();

    this.saveStats();
    this.clearData();
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  async saveStats() {
    let gameState: string = "";

    if(this.won) {
      gameState = "Gagné";
    }
    else {
      gameState = "Perdu";
    }

    let user_answer: string[] = [];

    for(let i = 0; i < this.choices.length; i++) {
      if(this.selectedChoices[i]) {
        user_answer.push(this.choices[i]);
      }
    }

    let attribute: string = "";

    for(let i = 0; i < this.possibleAttributes.length; i++) {
      if(this.possibleAttributes[i] == this.attribute) {
        attribute = this.possibleAttributesStats[i];
      }
    }

    let stat: any = {
      gameState: gameState,
      answer: this.answer,
      attribute: attribute,
      user_answer: user_answer,
      answer_name: this.champion.name,
      answer_icon: "assets/champion-icons/" + this.champion.name + ".png",
      date: this.formatDate(new Date())
    }

    let characteristics_stats_data = await this.storage.get("characteristics_stats_data") || [];
    characteristics_stats_data.push(stat);
    this.storage.set("characteristics_stats_data", characteristics_stats_data);
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
    this.storage.remove("characteristics_answer_data");
    this.storage.remove("characteristics_attribute_data");
    this.storage.remove("characteristics_attribute_display_data");
    this.storage.remove("characteristics_champion_data");
    this.storage.remove("characteristics_choices_data");
  }
}
