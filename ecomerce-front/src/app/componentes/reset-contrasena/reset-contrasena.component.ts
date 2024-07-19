import { Component, inject,OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { ResetContrasenaService } from '../../servicios/reset-contrasena.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports:[ReactiveFormsModule,NgIf,FormsModule,CommonModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatCard],
  templateUrl: './reset-contrasena.component.html',
  styleUrls: ['./reset-contrasena.component.css']
})
export class ResetContrasenaComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email: string | null = null;
  password: string | null = null;

  constructor(
    private registroService: RegistroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
      ])
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || null;
      this.password = params['password'] || null;
    });
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid && this.email && this.password) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      try {
        const response = await this.registroService.resetPassword(this.email, this.password, newPassword)
          .pipe(
            catchError(error => {
              console.error('Error en el restablecimiento de contraseña:', error);
              return of(null); // Return null or any default value to handle the error gracefully
            })
          )
          .toPromise();

        if (response) {
          //alert('Error en el restablecimiento de contraseña. Por favor, inténtalo de nuevo.');
          console.log('Restablecimiento de contraseña exitoso:', response);
          this.router.navigate(['/login']);
        } else {
          console.log('Restablecimiento de contraseña exitoso:', response);
          alert('Restablecimiento de contraseña exitoso');
          this.router.navigate(['/login']);
          
        }
      } catch (error) {
        console.error('Error en el restablecimiento de contraseña:', error);
        alert('Restablecimiento de contraseña exitoso');
        this.router.navigate(['/login']);
      }
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  get newPasswordControl() {
    return this.resetPasswordForm.get('newPassword');
  }
}