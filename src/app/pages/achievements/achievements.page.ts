import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, ViewWillEnter, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar } from '@ionic/angular/standalone';

import { AchievementsService, Achievement, AchievementLevel } from 'src/app/services/achievements.service';

import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, NavbarComponent, IonList, IonItem, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar]
})
export class AchievementsPage implements ViewWillEnter {
  achievements: Achievement[] = [];

  levels: AchievementLevel[] = [];

  constructor(private ach: AchievementsService) { }
  
  async ionViewWillEnter(): Promise<void> {
    await this.ach.init();
    this.achievements = this.ach.getAllAchievements();
    this.levels = this.ach.levels;
  }

  countUnlocked(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }

  totalAchievements(): number {
    return this.achievements.length;
  }

   unlockedPercentage(): number {
    return Math.round((this.countUnlocked() / this.totalAchievements()) * 100);
  }

  levelToNumber(level: AchievementLevel): number {
    return this.levels.indexOf(level);
  }

  totalLevelScore(): number {
    return this.achievements
      .filter(a => a.unlocked)
      .map(a => this.levelToNumber(a.level))
      .reduce((a, b) => a + b, 0);
  }

  maxLevelScore(): number {
    return this.totalAchievements() * (this.levels.length - 1);
  }

  levelProgressionPercentage(): number {
    return Math.round((this.totalLevelScore() / this.maxLevelScore()) * 100);
  }

  countByLevel(level: AchievementLevel): number {
    return this.achievements.filter(a => a.level === level).length;
  }

  getNextThreshold(ach: Achievement): number | null {
    const index = ach.thresholds.findIndex(t => t > ach.value);
    return index !== -1 ? ach.thresholds[index] : null;
  }
}
