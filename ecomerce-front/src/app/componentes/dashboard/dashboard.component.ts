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
    'assets/logoHome.png',
    'assets/reelHome1.png',
    'assets/reelHome2.png',
    // Añade más rutas de imágenes según sea necesario
  ];
  constructor(
 private router:Router,
  ){}
navigateToLogin(){
  this.router.navigate(['/login']);
}
navigateToRegister(){
  this.router.navigate(['/register']);
}
}
