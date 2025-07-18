import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { StorageService } from './storage.service';

export type AchievementLevel =
  | "Bloqué" | "Fer" | "Bronze" | "Argent" | "Or"
  | "Platine" | "Émeraude" | "Diamant" | "Maître"
  | "Grand-maître" | "Challenger";

type AchievementDefinition = Omit<Achievement, 'value' | 'unlocked' | 'level'>;

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  unlocked: boolean;
  thresholds: number[];
  level: AchievementLevel;
}

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private achievements: Achievement[] = [];

  private toastQueue: Achievement[] = [];
  private isShowingToast = false;

  levels: AchievementLevel[] = [
    "Bloqué", "Fer", "Bronze", "Argent", "Or",
    "Platine", "Émeraude", "Diamant", "Maître",
    "Grand-maître", "Challenger"
  ];

  constructor(private storage: StorageService,
              private toast: ToastController) {
    this.init();
  }

  async init() {
    const stored = await this.storage.get("achievements_data") || [];

    const defaults = this.getDefaultAchievements();

    this.achievements = this.mergeAchievements(defaults, stored);

    await this.storage.set("achievements_data", this.achievements);
  }

  private getDefaultAchievements(): Achievement[] {
    const defs: AchievementDefinition[] = [
      {
        id: "classic_enjoyer",
        title: "Amateur du mode Classique",
        subtitle: "Gagner des parties dans le mode Classique.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "classic_expert",
        title: "Expert du mode Classique",
        subtitle: "Gagner des parties en 3 essais ou moins dans le mode Classique.",
        thresholds: [1, 3, 5, 8, 12, 20, 30, 45, 75, 100]
      },
      {
        id: "classic_god",
        title: "Dieu du mode Classique",
        subtitle: "Gagner des parties en 1 essai dans le mode Classique.",
        thresholds: [1, 2, 3, 4, 6, 8, 10, 12, 16, 20]
      },
      {
        id: "characteristics_enjoyer",
        title: "Amateur du mode Caractéristiques",
        subtitle: "Gagner des parties dans le mode Caractéristiques.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "filter_enjoyer",
        title: "Amateur du mode Filtrage",
        subtitle: "Gagner des parties dans le mode Filtrage.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "chronology_enjoyer",
        title: "Amateur du mode Chronologie",
        subtitle: "Gagner des parties dans le mode Chronologie.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      }
    ]

    return defs.map(def => this.createAchievement(def));
  }

  private createAchievement(def: AchievementDefinition): Achievement {
    return {
      ...def,
      value: 0,
      unlocked: false,
      level: 'Bloqué'
    };
  }

  private mergeAchievements(defaults: Achievement[], stored: Achievement[]): Achievement[] {
    const storedMap = new Map(stored.map(a => [a.id, a]));

    const merged = defaults.map(defaultAch => {
      const storedAch = storedMap.get(defaultAch.id);
      return storedAch ? storedAch : defaultAch;
    });

    return merged;
  }

  getAllAchievements() {
    return this.achievements;
  }

  getAchievementLevel(value: number, thresholds: number[]): AchievementLevel {
    const index = thresholds.findIndex(threshold => value < threshold);
    return this.levels[Math.max(0, index)];
  }

  increment(id: string) {
    const ach = this.achievements.find(a => a.id === id);

    if (ach) {
      const previousLevel = ach.level;

      ach.value += 1;

      if (!ach.unlocked && ach.value >= 1) {
        ach.unlocked = true;
      }

      ach.level = this.getAchievementLevel(ach.value, ach.thresholds);

      this.storage.set("achievements_data", this.achievements);

      const levelIndex = this.levels.indexOf(ach.level);
      const prevLevelIndex = this.levels.indexOf(previousLevel);

      if (levelIndex > prevLevelIndex) {
        this.enqueueToast(ach);
      }
    }
  }

  private enqueueToast(achievement: Achievement) {
    this.toastQueue.push(achievement);
    if (!this.isShowingToast) {
      this.processToastQueue();
    }
  }

  private async processToastQueue() {
    if (this.toastQueue.length === 0) {
      this.isShowingToast = false;
      return;
    }

    this.isShowingToast = true;
    const achievement = this.toastQueue.shift();

    if (achievement) {
      let achievementState: string = "";
      if(achievement.level == "Fer") {
        achievementState = "débloqué";
      }
      else {
        achievementState = "amélioré";
      }
      
      const toast = await this.toast.create({
        message: "Succès " + achievementState + ` ! ${achievement.title} est maintenant niveau ${achievement.level} !`,
        duration: 3000,
        position: "bottom",
        color: "light",
        keyboardClose: true,
        swipeGesture: "vertical"
      });

      await toast.present();
      await toast.onDidDismiss();

      this.processToastQueue();
    }
  }
}
