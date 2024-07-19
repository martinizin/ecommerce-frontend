import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CuentaBancariaService } from '../../servicios/cuenta-bancaria.service';


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
  templateUrl: './formulario-cuenta-bancaria.component.html',
  styleUrls: ['./formulario-cuenta-bancaria.component.css']
})
export class FormularioCuentaBancariaComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cuentaBancariaService: CuentaBancariaService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      numCuenta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$'), // Solo números
        Validators.maxLength(20) // No más de 20 caracteres
      ]],
      tipCuenta: ['', Validators.required], // Campo obligatorio
      banco: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$') // Solo letras y números
      ]],
      nombre: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$') // Solo letras
      ]],
      apellido: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$') // Solo letras
      ]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formulario.valid) {
      const formValue = {
        ...this.formulario.value,
        tipCuenta: this.formulario.value.tipCuenta.toLowerCase() // Convertir tipCuenta a minúsculas
      };
      this.cuentaBancariaService.crearCuentaBancaria(this.formulario.value).subscribe(response => {
        console.log('Cuenta creada:', response);
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/cuenta-bancaria']); // Asegúrate de cambiar la ruta según tu configuración
  }
}
