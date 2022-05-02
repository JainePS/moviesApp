import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/lists-response';


@Component({
  selector: 'app-movies-posters-grid',
  templateUrl: './movies-posters-grid.component.html',
  styleUrls: ['./movies-posters-grid.component.css']
})
export class MoviesPostersGridComponent implements OnInit {

  @Input() movies: Result[]; 

  constructor() { 
    this.movies = [];
  }

  ngOnInit(): void {
    console.log(this.movies);

  }

}
