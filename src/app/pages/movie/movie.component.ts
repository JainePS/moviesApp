import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieDetail } from 'src/app/interfaces/movie-response';
import { MoviesService } from 'src/app/services/movies.service';
import { Cast } from 'src/app/interfaces/cast-response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  public movie!: MovieDetail;
  public cast: Cast[] =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.moviesService.getMovieDetail(id).subscribe((movie: any) => {
      this.movie = movie;

      if(!movie){
        this.router.navigateByUrl('/home')
      }

      this.moviesService.getCastDetail(id).subscribe((cast) => {
        this.cast = cast;
        console.log(this.cast);
        
      });
    });
  }

  turnBack() {
    this.location.back();
  }
}
