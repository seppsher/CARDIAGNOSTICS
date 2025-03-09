import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDataTableComponent } from './components/movies-data-table/movies-data-table.component';
import { MoviesDataFiltersComponent } from './components/movies-data-filters/movies-data-filters.component';
import { MoviesDataFiltersFormStateService } from './components/movies-data-filters/movies-data-filters-form-state.service';

@Component({
  selector: 'app-movies-data',
  imports: [CommonModule, MoviesDataTableComponent, MoviesDataFiltersComponent],
  providers: [MoviesDataFiltersFormStateService],
  templateUrl: './movies-data.container.html',
  standalone: true
})
export class MoviesDataComponent {
  constructor() {}
}
