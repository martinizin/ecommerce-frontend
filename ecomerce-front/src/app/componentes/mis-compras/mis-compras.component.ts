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
  compras: any[] = [];
  username:string="";
  constructor(
    private misVentasService: MisVentasService,
    private router:Router) { }

  ngOnInit(): void {
      this.username = localStorage.getItem('buyerUsername')|| '';//obtiene el item username sino (||) trae vacio
      this.listarCompras();
    }

    listarCompras(): void {
      this.misVentasService.listarVentaporId()
        .subscribe((productos: any) => {
          this.compras = productos.filter((x:any)=>x.buyerUsername.includes(localStorage.getItem('username')|| '')) //
          console.log(this.compras);
        });
    }
    trackById(index: number, producto: any): number {
      return producto.id;
    }
 
  regresar(): void {
    this.router.navigate(['/home']);
  }
}