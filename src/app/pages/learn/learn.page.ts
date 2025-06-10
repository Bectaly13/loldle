import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton, IonItem, IonAvatar, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonBadge } from '@ionic/angular/standalone';

import { ChampionsService, Champion, Name } from 'src/app/services/champions.service';

export interface Category {
  name: string;
  displayName: string;
}

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonItem, IonAvatar, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonBadge]
})
export class LearnPage implements ViewWillEnter {
  mode: "champion" | "category" | null = null;

  champions: Champion[] = this.champ.champions;
  categories: Category[] = [
    {name: "gender", displayName: "Genre"},
    {name: "role", displayName: "Rôle"},
    {name: "species", displayName: "Espèce"},
    {name: "resource", displayName: "Ressource"},
    {name: "range", displayName: "Portée"},
    {name: "region", displayName: "Région"},
    {name: "year", displayName: "Année"}
  ]

  selectedChampion: Champion | null = null;

  selectedCategory: Category | null = null;
  selectedValue: string | null = null;
  
  categoryValues: string[] = [];

  filteredChampions: Champion[] = [];

  constructor(private champ: ChampionsService) { }

  ionViewWillEnter(): void {
  }

  selectChampion(champion: Champion) {
    this.selectedChampion = champion;
  }

  clearSelection() {
    this.selectedChampion = null;
  }

  selectCategory(cat: Category) {
    this.selectedCategory = cat;
    this.selectedValue = null;

    const valuesSet = new Set<string>();

    this.champions.forEach(champ => {
      const val = (champ as any)[cat.name];
      if (Array.isArray(val)) {
        val.forEach(v => valuesSet.add(v));
      } else if (val !== undefined && val !== null) {
        valuesSet.add(val.toString());
      }
    });

    this.categoryValues = Array.from(valuesSet).sort();
    this.filteredChampions = [];
  }

  selectValue(val: string) {
    this.selectedValue = val;

    this.filteredChampions = this.champions.filter(champ => {
      const champVal = (champ as any)[this.selectedCategory!.name];
      if (Array.isArray(champVal)) {
        return champVal.includes(val);
      } else {
        return champVal === val;
      }
    });
  }

  isExactMatch(champ: Champion): boolean {
    if (!this.selectedCategory || !this.selectedValue) return false;

    const val = (champ as any)[this.selectedCategory.name];
    if (Array.isArray(val)) {
      return val.length === 1 && val[0] === this.selectedValue;
    } else {
      return val === this.selectedValue;
    }
  }

  clearCategorySelection() {
    this.selectedCategory = null;
    this.selectedValue = null;
    this.filteredChampions = [];
  }
}
