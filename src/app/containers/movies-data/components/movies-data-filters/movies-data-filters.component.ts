import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDataFiltersFormStateService } from './movies-data-filters-form-state.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies-data-filters',
  imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './movies-data-filters.component.html',
  standalone: true
})
export class MoviesDataFiltersComponent implements OnInit {
  constructor(public moviesDataFiltersFormStateService: MoviesDataFiltersFormStateService) {}

  public ngOnInit(): void {
    this.moviesDataFiltersFormStateService.buildForm();
  }
}
