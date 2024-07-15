import { Component, inject } from '@angular/core';
import { ResetContrasenaService } from '../../servicios/reset-contrasena.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-reset',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './send-reset.component.html',
  styleUrl: './send-reset.component.css'
})
export class SendResetComponent {
  email: string = '';
  password: string = '';
  router = inject(Router);
  
  constructor(private resetContrasena: ResetContrasenaService) {}

  sendResetLink() {
    this.resetContrasena.sendResetLink(this.email, this.password).subscribe(response => {
      alert('DIRECCIÓN DE CORREO NO ENCONTRADA!');
    }, error => {
      alert('HEMOS ENVIADO UN LINK DE RECUPERACIÓN A TU CORREO ELECTRÓNICO, PUEDES CERRAR ESTA VENTANA:D');
      this.router.navigate(['/login']);
    });
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}

