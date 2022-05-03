import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result } from 'src/app/interfaces/lists-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   public texto = '';
   public movies: Result[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params=> {
    this.texto = params['texto'];
    this.moviesService.searchMovies(params['texto']).subscribe( movies =>{
      this.movies = movies;
      
    } )
      
        
    } )
  }

}
