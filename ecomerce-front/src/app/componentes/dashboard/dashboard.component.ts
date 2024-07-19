import { Component,Inject,inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,NgStyle,MatButtonModule,MatToolbarModule,MatIconModule,MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  images = [
    'assets/reelHome7.jpg',
    'assets/reelHome1.png',
    'assets/reelHome2.png',
    'assets/reelHome3.png',
    'assets/reelHome4.png',
    'assets/reelHome5.png',
    'assets/reelHome6.png',
    'assets/reelHome7.png',
    // Añade más rutas de imágenes según sea necesario
  ];
  currentImageIndex = 0;
  constructor(
 private router:Router,
  ){}
  ngOnInit() {
    this.startCarousel();
  }
  startCarousel() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 5000); // Cambia la imagen cada 5 segundos
  }


navigateToLogin(){
  
  this.router.navigate(['/login']);
}
navigateToRegister(){
  this.router.navigate(['/register']);
}
}
