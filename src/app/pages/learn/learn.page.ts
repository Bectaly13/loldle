import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('contentRef', { static: false }) contentRef!: IonContent;

  champions: Champion[] = this.champ.champions;
  selectedChampion: Champion | null = null;
  loadedChampions: Champion[] = [];
  batchSize: number = 50;
  currentIndex: number = 0;

  constructor(private champ: ChampionsService) { }

  ionViewWillEnter(): void {
    this.loadedChampions = [];
    this.currentIndex = 0;
    this.loadMoreChampions();
    this.selectedChampion = null;
  }

  loadMoreChampions() {
    if (this.currentIndex >= this.champions.length) return;
    const nextBatch = this.champions.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.loadedChampions = this.loadedChampions.concat(nextBatch);
    this.currentIndex += this.batchSize;
  }

  async onScroll() {
    const scrollEl = await this.contentRef.getScrollElement();
    
    const scrollTop = scrollEl.scrollTop;
    const clientHeight = scrollEl.clientHeight;
    const scrollHeight = scrollEl.scrollHeight;

    const threshold = 200;
    const position = scrollTop + clientHeight;

    if (position + threshold >= scrollHeight) {
      this.loadMoreChampions();
    }
  }

  selectChampion(champion: Champion) {
    this.selectedChampion = champion;
  }

  clearSelection() {
    this.selectedChampion = null;
  }
}
