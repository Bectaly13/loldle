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
        title: "Simple et efficace",
        subtitle: "Gagnez des parties dans le mode Classique.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "classic_expert",
        title: "Analyste professionnel",
        subtitle: "Gagnez des parties en 3 essais ou moins dans le mode Classique.",
        thresholds: [1, 3, 5, 8, 12, 20, 30, 45, 75, 100]
      },
      {
        id: "classic_god",
        title: "Coup de chance ?",
        subtitle: "Gagnez des parties en 1 essai dans le mode Classique.",
        thresholds: [1, 2, 3, 4, 6, 8, 10, 12, 16, 20]
      },
      {
        id: "characteristics_enjoyer",
        title: "Connaître les bases",
        subtitle: "Gagnez des parties dans le mode Caractéristiques.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "characteristics_streak",
        title: "Maître des séries",
        subtitle: "Gagnez des parties d'affilée dans le mode Caractéristiques.",
        thresholds: [2, 3, 5, 8, 12, 18, 25, 35, 50, 100]
      },
      {
        id: "characteristics_error",
        title: "À côté de la plaque",
        subtitle: "Cochez uniquement les mauvaises réponses dans le mode Caractéristiques.",
        thresholds: [2, 3, 5, 8, 12, 18, 25, 35, 50, 100]
      },
      {
        id: "filter_enjoyer",
        title: "Œil d'aigle",
        subtitle: "Gagnez des parties dans le mode Filtrage.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "filter_streak",
        title: "Sans-faute",
        subtitle: "Gagnez des parties d'affilée dans le mode Filtrage.",
        thresholds: [2, 3, 5, 8, 12, 18, 25, 35, 50, 100]
      },
      {
        id: "filter_error",
        title: "Erreur de parcours",
        subtitle: "Cochez uniquement les mauvaises réponses dans le mode Filtrage.",
        thresholds: [2, 3, 5, 8, 12, 18, 25, 35, 50, 100]
      },
      {
        id: "chronology_enjoyer",
        title: "Historien",
        subtitle: "Gagnez des parties dans le mode Chronologie.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "chronology_streak",
        title: "Créateur du flux temporel",
        subtitle: "Gagnez des parties d'affilée dans le mode Chronologie.",
        thresholds: [2, 3, 5, 8, 12, 18, 25, 35, 50, 100]
      },
      {
        id: "marathonian",
        title: "Marathonien",
        subtitle: "Jouez des parties tous modes confondus.",
        thresholds: [10, 50, 100, 250, 500, 1000, 1500, 2500, 5000, 10000]
      },
      {
        id: "winner",
        title: "Omniscient",
        subtitle: "Gagnez des parties tous modes confondus.",
        thresholds: [10, 50, 100, 250, 500, 750, 1000, 1500, 2000, 3000]
      },
      {
        id: "daily_streak",
        title: "Habitué",
        subtitle: "Jouez plusieurs jours d'affilée sans interruption.",
        thresholds: [2, 3, 5, 7, 10, 15, 20, 30, 50, 100]
      },
      {
        id: "addicted",
        title: "Addict",
        subtitle: "Jouez plusieurs parties dans la même journée.",
        thresholds: [5, 10, 20, 50, 100, 150, 200, 250, 350, 500]
      },
      {
        id: "unstoppable",
        title: "Innarêtable",
        subtitle: "Gagnez plusieurs parties dans la même journée.",
        thresholds: [5, 10, 20, 30, 50, 75, 100, 150, 200, 250]
      },
      {
        id: "insomnia",
        title: "Insomniaque du Nexus",
        subtitle: "Gagnez des parties entre 2h et 4h du matin.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "early_bird",
        title: "Lève-tôt",
        subtitle: "Gagnez des parties entre 5h et 7h du matin.",
        thresholds: [1, 5, 10, 15, 20, 40, 75, 100, 150, 300]
      },
      {
        id: "coffee_break",
        title: "Pause café",
        subtitle: "Gagnez des parties entre 13h et 14h.",
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

    if(index === -1) {
      return this.levels[this.levels.length - 1];
    }
    else {
      return this.levels[index];
    }
  }

  increment(id: string) {
    const ach = this.achievements.find(a => a.id === id);

    if (ach) {
      const previousLevel = ach.level;

      ach.value += 1;

      if (!ach.unlocked && ach.value >= ach.thresholds[0]) {
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
        message: "Succès " + achievementState + ` ! "${achievement.title}" est maintenant niveau ${achievement.level} !`,
        duration: 3000,
        position: "bottom",
        color: "light",
        keyboardClose: true,
        swipeGesture: "vertical",
        animated: true,
        cssClass: "custom-toast"
      });

      await toast.present();
      await toast.onDidDismiss();

      this.processToastQueue();
    }
  }

  updateValue(id: string, newValue: number) {
  const ach = this.achievements.find(a => a.id === id);

    if (ach && newValue > ach.value) {
      const previousLevel = ach.level;

      ach.value = newValue;
      if (!ach.unlocked && ach.value >= ach.thresholds[0]) {
        ach.unlocked = true;
      }

      ach.level = this.getAchievementLevel(ach.value, ach.thresholds);

      if (ach.level !== previousLevel && this.levels.indexOf(ach.level) > this.levels.indexOf(previousLevel)) {
        this.enqueueToast(ach);
      }

      this.storage.set("achievements_data", this.achievements);
    }
  }

  checkTime() {
    const now = new Date();
    const hour = now.getHours();
    if (hour === 13) {
      this.increment("coffee_break");
    }
    if (hour >= 5 && hour < 7) {
      this.increment("early_bird");
    }
    if (hour >= 2 && hour < 4) {
      this.increment("insomnia");
    }
  }

  async updateDailyStreak() {
    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayStr = today.toISOString().slice(0, 10);

    const lastDayStr = await this.storage.get("daily_streak_last_day");
    let streak = await this.storage.get("daily_streak_count") || 0;

    if (lastDayStr) {
      const lastDay = new Date(lastDayStr);
      const lastDayDateOnly = new Date(lastDay.getFullYear(), lastDay.getMonth(), lastDay.getDate());

      const diffDays = Math.floor(
        (todayDateOnly.getTime() - lastDayDateOnly.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        streak++;
      } else if (diffDays !== 0) {
        streak = 1;
      }
    } else {
      streak = 1;
    }

    this.storage.set("daily_streak_last_day", todayStr);
    this.storage.set("daily_streak_count", streak);

    this.updateValue("daily_streak", streak);
  }

  async updateDailyPlayCount() {
    const today = new Date().toISOString().slice(0, 10);
    const lastDay = await this.storage.get("daily_play_date");
    let count = await this.storage.get("daily_play_count") || 0;

    if (lastDay === today) {
      count++;
    } else {
      count = 1;
      await this.storage.set("daily_play_date", today);
    }

    await this.storage.set("daily_play_count", count);
    this.updateValue("addicted", count);
  }

  async updateDailyWinCount() {
    const today = new Date().toISOString().slice(0, 10);
    const lastDay = await this.storage.get("daily_win_date");
    let count = await this.storage.get("daily_win_count") || 0;

    if (lastDay === today) {
      count++;
    } else {
      count = 1;
      await this.storage.set("daily_win_date", today);
    }

    await this.storage.set("daily_win_count", count);
    this.updateValue("unstoppable", count);
  }
}
