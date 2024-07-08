import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroService } from '../../servicios/registro.service';
import { Router, RouterModule } from '@angular/router';
import { AlertaloginComponent } from '../alertalogin/alertalogin.component';
import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formulario: FormGroup;
  registroService = inject(RegistroService);
  router = inject(Router);

  constructor(
    private dialog:MatDialog
  ) {
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    if (this.formulario.valid) {
      const response = await this.registroService.login(this.formulario.value);
      console.log(response);
      this.router.navigate(['/home']);
    }else 
    this.dialog.open(AlertaloginComponent).afterClosed().subscribe(() => {
     
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetContrasena() {
    this.router.navigate(['/send-reset']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
