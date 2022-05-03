import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  searchMovie(texto: string) {
    texto = texto.trim();
    if (texto.length === 0) {
      return;
    }

    this.router.navigate(['/search', texto]);
    console.log(texto);
  }
}
