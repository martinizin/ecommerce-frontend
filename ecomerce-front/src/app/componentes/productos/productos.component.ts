import { Component, OnInit } from '@angular/core';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgClass,NgFor,NgIf } from '@angular/common';

@Component({
  selector: 'app-producto',
  standalone:true,
  imports:[MatIcon,NgClass,NgFor,NgIf],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private crudProductosService: CrudProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crudProductosService.list()
      .subscribe((productos: any) => {
        this.productos = productos;
      });
  }

  nuevoProducto(): void {
    this.router.navigate(['/crear']);
  }
  regresar(): void {
    this.router.navigate(['/home']);
  }

  update(id: number, nuevoProducto: any): void {
    this.crudProductosService.update(id, nuevoProducto)
      .subscribe((response: any) => {
        // Manejar la respuesta si es necesario
        console.log('Producto actualizado:', response);
        // Puedes recargar la lista de productos después de la actualización
        this.actualizarListaProductos();
      }, (error: any) => {
        // Manejar el error si ocurre
        console.error('Error al actualizar el producto:', error);
      });
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

  private actualizarListaProductos(): void {
    this.crudProductosService.list()
      .subscribe((productos: any) => {
        this.productos = productos;
      });
  }

  trackById(index: number, producto: any): number {
    return producto.id;
  }
}