import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MisVentasService } from '../../servicios/mis-ventas.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
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