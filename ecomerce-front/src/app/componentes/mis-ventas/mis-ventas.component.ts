import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { MisVentasService } from '../../servicios/mis-ventas.service';
@Component({
  selector: 'app-mis-ventas',
  standalone: true,
  imports: [MatIcon,NgClass,NgFor,NgIf],
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
          this.ventas = productos; //
          console.log(this.ventas);
        });
    }
    trackById(index: number, producto: any): number {
      return producto.id;
    }
 
  regresar(): void {
    this.router.navigate(['/home']);
  }
}
