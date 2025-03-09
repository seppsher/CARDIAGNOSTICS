import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MoviesDataFiltersFormConst } from './movies-data-filters-form.const';

@Injectable()
export class MoviesDataFiltersFormStateService {
  private _form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public buildForm(): void {
    this._form = this.formBuilder.group({
      title: new FormControl<string>(''),
      year: new FormControl<string>('')
    });
  }

  public get form(): FormGroup {
    return this._form;
  }

  public get title(): FormControl<string> {
    return this.form.get(MoviesDataFiltersFormConst.TITLE) as FormControl<string>;
  }

  public get year(): FormControl<string> {
    return this.form.get(MoviesDataFiltersFormConst.YEAR) as FormControl<string>;
  }
}