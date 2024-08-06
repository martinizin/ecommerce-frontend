import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  backgroundImage: string = 'assets/reelHome7.png';
  currentImageIndex: number = 0;
  showContactCard: boolean = false; // Añadido para manejar la visualización de la tarjeta de contacto

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  toggleContactCard() {
    this.showContactCard = !this.showContactCard; // Añadido para alternar la visualización de la tarjeta de contacto
  }
}