import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistroService } from '../../servicios/registro.service';
import { catchError, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-cambiar-contrasena',
  standalone:true,
  imports:[ReactiveFormsModule,NgIf],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  cambiarContrasenaForm: FormGroup;
  submitted = false;
  success = false;
  error = '';
  email: string | null = null;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cambiarContrasenaForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['password'];
  }

  get f() { return this.cambiarContrasenaForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.cambiarContrasenaForm.invalid) {
      return;
    }
  
    const password = this.f['password'].value;
  
    if (this.email && this.token) {
      this.registroService.resetPassword(this.email, password)
        .pipe(
          catchError(error => {
            this.success = false;
            this.error = error.message || 'An error occurred while processing your request.';
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        });
    } else {
      this.error = 'Invalid or missing token. Cannot reset password.';
    }
  }
  

  }
