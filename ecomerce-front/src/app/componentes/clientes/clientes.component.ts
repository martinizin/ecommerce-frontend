import { Component, OnInit } from '@angular/core';
import { ListadoProductosService } from '../../servicios/listado-productos.service';
import { Router } from '@angular/router';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RealizarCompraService } from '../../servicios/realizar-compra.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarritoCompraService } from '../../servicios/carrito-compra.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-clientes',
  standalone:true,
  imports:[ReactiveFormsModule,NgFor,FormsModule,MatIcon],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  productos: any[] = [];
  username: string = '';
  numProductosCarrito: number = 0; // Añadir esta propiedad

  constructor(
    private listadoProductosService: ListadoProductosService,
    private realizarCompraService: RealizarCompraService,
    private router: Router,
    private snackBar: MatSnackBar,
    private carritoCompraService: CarritoCompraService // Inyectar el servicio
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    const token = localStorage.getItem('token') || '';
    this.listarProductos(token);
    this.carritoCompraService.carrito$.subscribe(carrito => {
      this.numProductosCarrito = carrito.length;
    });
  }

  listarProductos(token: string): void {
    this.listadoProductosService.listarProductos(token)
      .subscribe((productos: any[]) => {
        this.productos = productos.map(producto => ({ ...producto, quantity: 1 }));
      });
  }

  comprarProducto(): void {
    this.router.navigate(['/realizar-compra']);
  }

  regresar(): void {
    this.router.navigate(['/home']);
  }

  increaseQuantity(producto: any): void {
    if (producto.quantity < producto.stockproducto) {
      producto.quantity++;
    } else {
      this.snackBar.open('Ha alcanzado el máximo de stock disponible', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  decreaseQuantity(producto: any): void {
    if (producto.quantity > 1) {
      producto.quantity--;
    }
  }
  navigateToCarrito(): void {
    this.router.navigate(['/carrito']);
  }

  addToCart(producto: any): void {
    this.carritoCompraService.agregarProducto(producto);
    this.router.navigate(['carrito']);
  }
}
