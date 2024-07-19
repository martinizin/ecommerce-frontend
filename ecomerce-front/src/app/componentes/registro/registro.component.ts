import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RegistroService } from '../../servicios/registro.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnlaceVerificacionComponent } from '../enlace-verificacion/enlace-verificacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule ,
    CommonModule// Asegúrate de importar RouterModule si usas Router
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formulario: FormGroup;
  otpForm: FormGroup;
  showOtpForm = false;
  email?: string;  // Usa el modificador opcional aquí
  registroService = inject(RegistroService);
  router = inject(Router);
 

  constructor(
    private dialog:MatDialog
  ) {
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
      ]),
      numero: new FormControl('', [
        Validators.required,
        Validators.pattern('^09\\d{8}$') // La expresión regular para validar el número telefónico
      ]),
      rol: new FormControl('', [Validators.required, this.singleSelectionValidator])
    });

    this.otpForm = new FormGroup({
      otp: new FormControl('', Validators.required)
    });
  }
  async onSubmit() {
    if (this.formulario.valid) {
      try {
        const response = await this.registroService.register(this.formulario.value);
        console.log('Registro exitoso:', response);
        
        this.email = response.email;
        this.showOtpForm = true;
        this.dialog.open(EnlaceVerificacionComponent).afterClosed().subscribe(() => {
        });
      } catch (error) {
        console.error('Error en el registro:', error);
        this.dialog.open(EnlaceVerificacionComponent).afterClosed().subscribe(() => {
        });
      }
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  async onOtpSubmit() {
    if (this.otpForm.valid) {
      try {
        const otp = this.otpForm.value.otp;
        if (this.email) {  
          const response = await this.registroService.verifyOtp(this.email, otp);
          alert('Verificación OTP exitosa:');
          this.router.navigate(['/login']);
        } else {
          console.error('El email no está definido.');
        }
      } catch (error) {
        console.error('Error en la verificación OTP:', error);
      }
    } else {
      this.otpForm.markAllAsTouched();
    }
  }
  singleSelectionValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (Array.isArray(control.value) && control.value.length > 1) {
      return { multipleSelection: true };
    }
    return null;
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  
}
