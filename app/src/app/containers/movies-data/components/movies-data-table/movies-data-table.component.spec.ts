import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { of } from 'rxjs';
import { MoviesDataTableComponent } from './movies-data-table.component';
import { MoviesDataService } from '../../services/movies-data.service';
import { MoviesDataFiltersFormStateService } from '../movies-data-filters/movies-data-filters-form-state.service';
import { DefaultValuePipe } from '@shared/pipes/default-value.pipe';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MoviesDataTableComponent', () => {
  let component: MoviesDataTableComponent;
  let fixture: ComponentFixture<MoviesDataTableComponent>;
  let moviesDataService: jasmine.SpyObj<MoviesDataService>;
  let moviesDataFiltersFormStateService: jasmine.SpyObj<MoviesDataFiltersFormStateService>;

  beforeEach(async () => {
    const moviesDataServiceSpy = jasmine.createSpyObj('MoviesDataService', ['getMovies']);
    const moviesDataFiltersFormStateServiceSpy = jasmine.createSpyObj('MoviesDataFiltersFormStateService', ['form', 'title', 'year'], { form: { valueChanges: of() } });

    await TestBed.configureTestingModule({
      imports: [MatTableModule, DragDropModule, MatSortModule, MoviesDataTableComponent, DefaultValuePipe],
      providers: [
        { provide: MoviesDataService, useValue: moviesDataServiceSpy },
        { provide: MoviesDataFiltersFormStateService, useValue: moviesDataFiltersFormStateServiceSpy },
        { provide: HttpClient, useClass: HttpClientTestingModule }        
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesDataTableComponent);
    component = fixture.componentInstance;
    moviesDataService = TestBed.inject(MoviesDataService) as jasmine.SpyObj<MoviesDataService>;
    moviesDataFiltersFormStateService = TestBed.inject(MoviesDataFiltersFormStateService) as jasmine.SpyObj<MoviesDataFiltersFormStateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set displayed columns on init', () => {
    component.ngOnInit();
    expect(component.displayedColumns.length).toBe(component.columns.length);
  });

  it('should set sort after view init', () => {
    component.ngAfterViewInit();
    expect(component.movies?.sort).toBe(component.sort);
  });

  it('should update displayed columns on drop', () => {
    component.ngOnInit();
    const initialColumns = [...component.displayedColumns];
    component.dragStarted({} as any, 0);
    component.dropListDropped({} as any, 1);
    expect(component.displayedColumns).not.toEqual(initialColumns);
  });

  it('should call getMovies on filter form changes', () => {
    spyOn(component, 'getMovies');
    component.ngOnInit();
    moviesDataFiltersFormStateService.form.valueChanges.subscribe(() => {
      expect(component.getMovies).toHaveBeenCalled();
    });
  });
});