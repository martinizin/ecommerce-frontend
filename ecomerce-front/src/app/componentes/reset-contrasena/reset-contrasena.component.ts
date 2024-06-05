import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../../servicios/registro.service';
import { catchError, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports:[ReactiveFormsModule,NgIf],
  templateUrl: './reset-contrasena.component.html',
  styleUrls: ['./reset-contrasena.component.css']
})
export class ResetContrasenaComponent implements OnInit {
  resetForm: FormGroup;
  submitted = false;
  success = false;
  error = '';
  router = inject(Router);

  constructor(private formBuilder: FormBuilder, private registroService: RegistroService) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.resetForm.invalid) {
      return;
    }
  
    this.registroService.requestPasswordReset(this.f['email'].value)
      .pipe(
        catchError(error => {
          this.success = false;
          this.error = error.message || 'An error occurred while processing your request.';
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.success = true;
        this.error = '';
      });
  }
  goToReset(){
    this.router.navigate(['/reset-contrasena']);
  }

  }
