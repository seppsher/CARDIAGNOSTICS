import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieList } from '@shared/models/movie.model';

@Injectable()
export class MoviesDataService {
  constructor(private httpClient: HttpClient) {}

  private readonly URL: string = 'https://www.omdbapi.com/?apikey=662750e1';

  public getMovies(data: {title: string, year: string}): Observable<MovieList> {
    let url: string = this.URL;
    data.title ? url += `&s=${data.title}` : () => {};
    data.year ? url += `&y=${data.year}` : () => {};

    return this.httpClient.get<MovieList>(`${url}`);
  }
}