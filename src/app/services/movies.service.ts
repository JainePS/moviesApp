import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getLists(){
    return this.http.get('https://api.themoviedb.org/3/movie/550?api_key=a08471f81d82f909a7a921eb4d1f4406')
  }

}
