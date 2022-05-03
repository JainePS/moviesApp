import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of } from 'rxjs';
import {  Result } from '../interfaces/lists-response';
import { MovieDetail } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private listPage = 1;

  charging: boolean = false;
  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: 'a08471f81d82f909a7a921eb4d1f4406',
      language: 'en-US',
      page: this.listPage,
    };
  }

  getLists(): Observable<Result[]> {
    if (this.charging) {
      return of([]);
    }

    this.charging = true;

    return this.http
      .get<Result>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((result: any): any => {
          return result.results;
        }),
        tap(() => {
          this.listPage += 1;
          this.charging = false;
        })
      );
  }

  searchMovies(texto: string): Observable<Result[]> {

    const params = {...this.params, page: '1', query: texto}
    
    
    return this.http.
        get<Result>(`${this.baseUrl}/search/movie`, {
          params,
        }).pipe(
          map( (result: any): any => {
             return result.results}) )
    
  }
  resetListPage(){
    this.listPage = 1;
  }

  getMovieDetail(id: string){
    return this.http.get<MovieDetail>(`${this.baseUrl}/movie/${id}`, {
      params: this.params,
    })
  }

}
