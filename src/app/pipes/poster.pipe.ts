import { Pipe, PipeTransform } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  noImage = './assets/material-peliculas/no-image.jpg'

  transform(poster: string): string {
 
    if(poster || poster != null){

      return `http://image.tmdb.org/t/p/w300${poster}`
    }else{
      return `${this.noImage}`
    }
    
    
  }

}
