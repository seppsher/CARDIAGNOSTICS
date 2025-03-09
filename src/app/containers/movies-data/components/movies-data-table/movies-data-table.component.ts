import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesDataService } from '../../services/movies-data.service';
import { MoviesDataFiltersFormStateService } from '../movies-data-filters/movies-data-filters-form-state.service';
import { debounceTime, takeUntil } from 'rxjs';
import { Destroyable } from '@shared/directives/destroyable';
import { Movie } from '@shared/models/movie.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CdkDragStart, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MoviesDataTableConst } from './movies-data-table.const';
import { DefaultValuePipe } from '@shared/pipes/default-value.pipe';

@Component({
  selector: 'app-movies-data-table',
  imports: [CommonModule, MatTableModule, DragDropModule, MatSortModule, DefaultValuePipe],
  templateUrl: './movies-data-table.component.html',
  styleUrl: './movies-data-table.component.scss',
  providers: [MoviesDataService],
  standalone: true
})
export class MoviesDataTableComponent extends Destroyable implements OnInit, AfterViewInit {
  public movies = new MatTableDataSource<Movie>([]);
  public columns: { field: string, index?: number }[] = [
    { field: MoviesDataTableConst.POSTER },
    { field: MoviesDataTableConst.TITLE },
    { field: MoviesDataTableConst.YEAR },
    { field: MoviesDataTableConst.RUNTIME },
    { field: MoviesDataTableConst.GENRE },
    { field: MoviesDataTableConst.DIRECTOR },
    { field: MoviesDataTableConst.PLOT }
  ];
  public displayedColumns: string[] = [];
  public readonly MOVIES_DATA_TABLE_CONST: typeof MoviesDataTableConst = MoviesDataTableConst;
  @ViewChild(MatSort)
  public sort!: MatSort;
  private previousIndex!: number | undefined;

  constructor(
    private moviesDataService: MoviesDataService,
    private moviesDataFiltersFormStateService: MoviesDataFiltersFormStateService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.watchMoviesDataFilterFormChanges();
    this.setDisplayedColumns();
  }

  public ngAfterViewInit(): void {
    this.movies.sort = this.sort;
  }

  public dragStarted(event: CdkDragStart, index: number): void {
    this.previousIndex = index;
  }

  public dropListDropped(event: any, index: number): void {
    if (event && this.previousIndex !== undefined) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
      this.previousIndex = undefined;
    }
  }
  
  public getMovies(): void {
    const data = {
      title: this.moviesDataFiltersFormStateService.title.value,
      year: this.moviesDataFiltersFormStateService.year.value
    };

    this.moviesDataService.getMovies(data).subscribe((data) => {
      this.movies.data = data.Search;
    });
  }
  
  private setDisplayedColumns(): void {
    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.field;
    });
  }

  private watchMoviesDataFilterFormChanges(): void {
    this.moviesDataFiltersFormStateService.form.valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.getMovies();
    })
  }
}
