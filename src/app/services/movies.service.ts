import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/lists-response';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getLists(): Observable<Movie>{
    return this.http.get<Movie>('https://api.themoviedb.org/3/movie/now_playing?api_key=a08471f81d82f909a7a921eb4d1f4406&language=en-US&page=1')
  }

}
