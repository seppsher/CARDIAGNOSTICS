import { Routes } from '@angular/router';
import { MoviesDataComponent } from './containers/movies-data/movies-data.container';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesDataComponent }
];
