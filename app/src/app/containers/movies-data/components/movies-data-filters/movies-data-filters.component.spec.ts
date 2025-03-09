import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesDataFiltersComponent } from './movies-data-filters.component';
import { MoviesDataFiltersFormStateService } from './movies-data-filters-form-state.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

describe('MoviesDataFiltersComponent', () => {
  let component: MoviesDataFiltersComponent;
  let fixture: ComponentFixture<MoviesDataFiltersComponent>;
  let moviesDataFiltersFormStateService: MoviesDataFiltersFormStateService;

  beforeEach(() => {
    const moviesDataFiltersFormStateServiceSpy = jasmine.createSpyObj('MoviesDataFiltersFormStateService', ['buildForm']);

    TestBed.configureTestingModule({
      imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MoviesDataFiltersComponent],
      providers: [
        { provide: MoviesDataFiltersFormStateService, useValue: moviesDataFiltersFormStateServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesDataFiltersComponent);
    component = fixture.componentInstance;
    moviesDataFiltersFormStateService = TestBed.inject(MoviesDataFiltersFormStateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call buildForm on ngOnInit', () => {
    component.ngOnInit();
    expect(moviesDataFiltersFormStateService.buildForm).toHaveBeenCalled();
  });
});