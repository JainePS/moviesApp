import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { MoviesPostersGridComponent } from './movies-posters-grid/movies-posters-grid.component';




@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    MoviesPostersGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    MoviesPostersGridComponent
  ]
})
export class ComponentsModule { }
