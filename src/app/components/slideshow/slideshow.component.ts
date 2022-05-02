import {  AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {  Result } from 'src/app/interfaces/lists-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.css']
  
})
export class SlideshowComponent implements OnInit, AfterViewInit{
  
  @Input() movies: Result[]; 

  public mySwiper: Swiper | any;
  
  constructor() {
    this.movies = [];
    
  }

  ngOnInit(): void {
    console.log(this.movies);
    
  }

  ngAfterViewInit(): void {
    

    this.mySwiper = new Swiper('.swiper', {
      
      loop: true,
    
    })
  } 
  
  onSlidePrev(){
    this.mySwiper.slideNext();
  
    
  }
  onSlideNext(){
    this.mySwiper.slidePrev()
  
  }


}
