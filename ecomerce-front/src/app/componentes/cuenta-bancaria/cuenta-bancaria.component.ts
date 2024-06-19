import { Component} from '@angular/core';
import { CuentaBancariaService } from '../../servicios/cuenta-bancaria.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cuenta-bancaria',
  standalone:true,
  imports:[FormsModule,MatCardModule,MatFormFieldModule,NgFor],
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css']
})
export class CuentaBancariaComponent {
  cuentasBancarias: any[] = [];
  username: string | null = '';

  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    private registerService: RegistroService,
    private router: Router,
  ) {}

  ngOnInit(): void {
   this.cargarCuentasBancarias();
  }

  cargarCuentasBancarias(): void {
    this.cuentaBancariaService.listarCuentasBancarias().subscribe(
      response => {
        this.cuentasBancarias  = response; // Asigna directamente el array de strings a categorias
      },
      error => {
        console.error('Error al listar cuentas:', error);
      }
    );
}
crearCuentaBancaria(){
  this.router.navigate(['/crear-cuenta-bancaria'])
}
regresar(): void {
  this.router.navigate(['/home']);
}



}