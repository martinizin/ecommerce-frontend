import { Component, OnInit } from '@angular/core';
import { ListadoProductosService } from '../../servicios/listado-productos.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RealizarCompraComponent } from '../realizar-compra/realizar-compra.component';
import { RealizarCompraService } from '../../servicios/realizar-compra.service';

@Component({
  selector: 'app-clientes',
  standalone:true,
  imports:[ReactiveFormsModule,NgFor],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  productos: any[] = [];
  username: string = '';
  

  constructor(
    private listadoProductosService: ListadoProductosService,
    private realizarCompraService:RealizarCompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    const token = localStorage.getItem('token') || '';
    this.listarProductos(token);
  }

  listarProductos(token: string): void {
    this.listadoProductosService.listarProductos(token)
      .subscribe((productos: any[]) => {
        this.productos = productos;
      });
  };

  comprarProducto():void{
   this.router.navigate(['/realizar-compra'])
      
  }



  regresar(){
    this.router.navigate(['/home'])
  }
}
