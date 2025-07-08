import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonButton } from '@ionic/angular/standalone';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ChampionsService, Champion } from 'src/app/services/champions.service';
import { StorageService } from 'src/app/services/storage.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-chronology',
  templateUrl: './chronology.page.html',
  styleUrls: ['./chronology.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, IonButton, DragDropModule]
})
export class ChronologyPage implements ViewWillEnter {
  champions: Champion[] = [];
  n: number = 0;

  slots: (Champion | null)[] = [null, null, null, null, null];
  draggables: Champion[] = [];

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
    const draggables_data = await this.storage.get("chronology_draggables_data");

    if(!draggables_data) {
      this.resetGame();
    }

    else {
      this.draggables = draggables_data;
    }
  }

  resetGame() {
    const shuffledChampions = [...this.champions].sort(() => Math.random() - 0.5);
    this.draggables = shuffledChampions.slice(0, 4);
    this.storage.set("chronology_draggables_data", this.draggables);

    this.slots = Array(this.draggables.length).fill(null);
    this.showResult = false;
    this.won = false;
  }

  reorder(event: CdkDragDrop<Champion[]>) {
    moveItemInArray(this.draggables, event.previousIndex, event.currentIndex);
  }

  submit() {
    this.showResult = true;

    const years = this.draggables.map(champ => champ.year);
    const sorted = [...years].sort((a, b) => a - b);
    this.won = JSON.stringify(years) === JSON.stringify(sorted);

    this.saveStats();
    this.clearData();
  }

  saveStats() {

  }

  clearData() {
    this.storage.remove("chronology_draggables_data");
  }
}
