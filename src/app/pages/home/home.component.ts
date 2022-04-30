import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/lists-response';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public movies: Result[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getLists().subscribe((result) => {

      this.movies = result.results;
      console.log(this.movies);
      
    });
  }
}
