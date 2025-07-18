import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'classic',
    loadComponent: () => import('./pages/classic/classic.page').then( m => m.ClassicPage)
  },
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learn.page').then( m => m.LearnPage)
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats.page').then( m => m.StatsPage)
  },  {
    path: 'stats-classic',
    loadComponent: () => import('./pages/stats-classic/stats-classic.page').then( m => m.StatsClassicPage)
  },
  {
    path: 'characteristics',
    loadComponent: () => import('./pages/characteristics/characteristics.page').then( m => m.CharacteristicsPage)
  },
  {
    path: 'filter',
    loadComponent: () => import('./pages/filter/filter.page').then( m => m.FilterPage)
  },
  {
    path: 'chronology',
    loadComponent: () => import('./pages/chronology/chronology.page').then( m => m.ChronologyPage)
  },
  {
    path: 'stats-characteristics',
    loadComponent: () => import('./pages/stats-characteristics/stats-characteristics.page').then( m => m.StatsCharacteristicsPage)
  },
  {
    path: 'stats-filter',
    loadComponent: () => import('./pages/stats-filter/stats-filter.page').then( m => m.StatsFilterPage)
  },
  {
    path: 'stats-chronology',
    loadComponent: () => import('./pages/stats-chronology/stats-chronology.page').then( m => m.StatsChronologyPage)
  },
  {
    path: 'achievements',
    loadComponent: () => import('./pages/achievements/achievements.page').then( m => m.AchievementsPage)
  },

];
