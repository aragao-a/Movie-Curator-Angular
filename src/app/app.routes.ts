import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () => import('./features/movies/movies.routes').then(m => m.MOVIE_ROUTES)
  },
  {
    path: 'generator',
    loadChildren: () => import('./features/generator/generator.routes').then(m => m.GENERATOR_ROUTES)
  },
  {
    path: 'marathons',
    loadChildren: () => import('./features/marathons-page/marathons.routes').then(m => m.MARATHON_ROUTES)
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  }
];