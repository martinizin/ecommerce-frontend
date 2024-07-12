import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { MisVentasService } from '../../servicios/mis-ventas.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-mis-ventas',
  standalone: true,
  imports: [MatIcon,NgClass,NgFor,NgIf,FormsModule],
  templateUrl: './mis-ventas.component.html',
  styleUrl: './mis-ventas.component.css'
})
export class MisVentasComponent {
  id: any[] = [];
  ventas: any[] = [];
  username:string="";
  constructor(
    private misVentasService: MisVentasService,
    private router:Router) { }

  ngOnInit(): void {
      this.username = localStorage.getItem('seller_username')|| ''; //obtiene el item username sino (||) trae vacio
      this.listarVentas();
    }

    listarVentas(): void {
      this.misVentasService.listarVentaporId()
        .subscribe((productos: any) => {
          this.ventas = productos.filter((x:any)=>x.sellerUsername.includes(localStorage.getItem('username')|| '')) //
          console.log(this.ventas);
        });
    }
    // En MisVentasComponent
cambiarEstado(venta: any, nuevoEstado: string): void {
  if (nuevoEstado === 'VERIFICADO') {
    this.misVentasService.verificarVenta(venta.id)
      .subscribe({
        next: (response) => {
          console.log('Venta verificada:', response);
          venta.state = nuevoEstado; // Asegúrate de actualizar el estado en la vista
        },
        error: (error) => {
          console.error('Error al verificar la venta:', error);
        }
      });
  } else {
    console.error('Estado no soportado:', nuevoEstado);
  }
}

    trackById(index: number, producto: any): number {
      return producto.id;
    }
 
  regresar(): void {
    this.router.navigate(['/home']);
  }
}
