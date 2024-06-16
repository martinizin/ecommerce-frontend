import { Component } from '@angular/core';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { ListadoProductosService } from '../../servicios/listado-productos.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [NgFor,MatIcon],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {
  productos: any[] = [];
  username:string="";

  constructor(
    private listadoProductosService: ListadoProductosService,
    private crudProductosService: CrudProductosService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username')|| ''; //obtiene el item username sino (||) trae vacio
    this.actualizarListaProductos();
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

  update(id:number): void {
    this.router.navigate(['/modificar', id]);
    // this.crudProductosService.update(id, nuevoProducto)
    //   .subscribe((response: any) => {
    //     // Manejar la respuesta si es necesario
    //     console.log('Producto actualizado:', response);
    //     // Puedes recargar la lista de productos después de la actualización
    //     this.actualizarListaProductos();
    //   }, (error: any) => {
    //     // Manejar el error si ocurre
    //     console.error('Error al actualizar el producto:', error);
    //   });
  }

  delete(id: number): void {
    this.crudProductosService.delete(id)
      .subscribe((response: any) => {
        console.log('Producto eliminado:', response);
        this.actualizarListaProductos();
      }, (error: any) => {
        console.error('Error al eliminar el producto:', error);
      });
  }

  actualizarListaProductos(): void {
    this.crudProductosService.listarporId()
      .subscribe((productos: any) => {
        this.productos = productos //
        console.log(this.productos);
      });
  }
  listarProductos(token: string): void {
    this.listadoProductosService.listarProductos(token)
      .subscribe((productos: any[]) => {
        this.productos = productos;
      });
  };

  trackById(index: number, producto: any): number {
    return producto.id;
  }
 
}

