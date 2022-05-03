import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie, Result } from 'src/app/interfaces/lists-response';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Result[] = [];
  public moviesSlideShow: Result[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop)+1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos >max) {

      if(this.moviesService.charging){return; }
      this.moviesService.getLists().subscribe((movies) => {
      this.movies.push(... movies);
      });
    }
   
  }

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
   
    
    this.moviesService.getLists().subscribe((movies: any) => {
      this.movies = movies;
      this.moviesSlideShow = movies;
     
    });
  }
  ngOnDestroy(): void {
    this.moviesService.resetListPage()
  }
}
