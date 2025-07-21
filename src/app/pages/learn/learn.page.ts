import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton, IonItem, IonLabel, IonList, IonCard, IonCardContent } from '@ionic/angular/standalone';

import { ChampionsService, Champion } from 'src/app/services/champions.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonItem, IonLabel, IonList, IonCard, IonCardContent, NavbarComponent]
})
export class LearnPage implements ViewWillEnter {
  champions: Champion[] = this.champ.champions;
  selectedChampion: Champion | null = null;

  constructor(private champ: ChampionsService) { }

  ionViewWillEnter(): void {
    this.selectedChampion = null;
  }

  selectChampion(champion: Champion) {
    this.selectedChampion = champion;
  }

  clearSelection() {
    this.selectedChampion = null;
  }
}
