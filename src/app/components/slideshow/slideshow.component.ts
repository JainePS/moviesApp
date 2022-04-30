import { Component, Input, OnInit} from '@angular/core';
import { Movie, Result } from 'src/app/interfaces/lists-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
 
})
export class SlideshowComponent implements OnInit{

  @Input() movies: Result[]; 

  constructor() {
    this.movies = [];
  }

  ngOnInit(): void {
    console.log(this.movies);
    
  }


}
