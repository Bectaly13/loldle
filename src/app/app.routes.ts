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
  },
];
