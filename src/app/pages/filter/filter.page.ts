import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton} from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';

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

  submit() {
    this.showResult = true;

    const correctIndexes = this.choices.map((champ, i) => {
      const attr = (champ as any)[this.attribute];
      return Array.isArray(attr) ? attr.includes(this.value) : attr === this.value;
    });

    this.correctIndexes = correctIndexes;

    const userCorrect = correctIndexes.every((val, i) => val === this.selectedChoices[i]);

    this.won = userCorrect;
  }
}
