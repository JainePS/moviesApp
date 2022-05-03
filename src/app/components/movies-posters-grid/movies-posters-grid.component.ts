import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/lists-response';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

interface StartRatingSettings {
  totalstars: number;
  readonly: boolean;
}

@Component({
  selector: 'app-movies-posters-grid',
  templateUrl: './movies-posters-grid.component.html',
  styleUrls: ['./movies-posters-grid.component.css'],
})
export class MoviesPostersGridComponent implements OnInit {
  @Input() movies: Result[];
  startRatingSettings: StartRatingSettings;

  constructor(private router: Router) {
    this.movies = [];

    this.startRatingSettings = {
      totalstars: 10,
      readonly: false,
    };
  }

  ngOnInit(): void {}

  onMovieClick( movie: Result ){
    this.router.navigate(['/movie', movie.id]);
    console.log(movie);
    
  }

  onRate($event: {
    oldValue: number;
    newValue: number;
    starRating: StarRatingComponent;
  }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
}
