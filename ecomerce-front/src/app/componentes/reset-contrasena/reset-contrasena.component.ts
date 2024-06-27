import { Component, inject} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { ResetContrasenaService } from '../../servicios/reset-contrasena.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports:[ReactiveFormsModule,NgIf,FormsModule,CommonModule],
  templateUrl: './reset-contrasena.component.html',
  styleUrls: ['./reset-contrasena.component.css']
})
export class ResetContrasenaComponent  {
  email: string = '';
  password: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  router = inject(Router);


  constructor(
    private route: ActivatedRoute,
    private resetContrasena: ResetContrasenaService
  ) {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.password = this.route.snapshot.queryParamMap.get('password') || '';
  }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.resetContrasena.resetPassword(this.email, this.newPassword).subscribe(response => {
        alert('Error Actualizando la contraseña, verifica abrir el enlace correctamente');
      }, error => {
        alert('Contraseña Actualizada Correctamente!');
        this.router.navigate(['/login']);
      });
    } else {
      alert('Las contraseñas no coinciden!');
    }
  }
}