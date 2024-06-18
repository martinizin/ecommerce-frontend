import { Component , OnInit} from '@angular/core';
import { CarritoCompraService } from '../../servicios/carrito-compra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { ListadoProductosService } from '../../servicios/listado-productos.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css'
})
export class CarritoComprasComponent implements OnInit{
  productosAgrupados: any[] = [];

  constructor(
    private carritoCompraService: CarritoCompraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carritoCompraService.carrito$.subscribe(productos => {
      this.productosAgrupados = this.agruparProductosPorEmprendedor(productos);
    });
  }

  agruparProductosPorEmprendedor(productos: any[]): any[] {
    const agrupados: any = {};
    productos.forEach(producto => {
      const emprendedor = producto.user.username;
      if (!agrupados[emprendedor]) {
        agrupados[emprendedor] = [];
      }
      agrupados[emprendedor].push(producto);
    });
    return Object.keys(agrupados).map(key => ({
      emprendedor: key,
      productos: agrupados[key],
      total: agrupados[key].reduce((acc: number, p: any) => acc + (p.precioprducto * p.quantity), 0)
    }));
  }

  comprar(grupo: any): void {
    // Lógica para realizar la compra de los productos de un emprendedor
    console.log(`Comprando productos del emprendedor: ${grupo.emprendedor}`);
    console.log(`Productos:`, grupo.productos);
    console.log(`Total a pagar: $${grupo.total}`);
    // Aquí puedes añadir la lógica para realizar la compra
  }
  quitarDelCarrito(producto: any): void {
    this.carritoCompraService.quitarProducto(producto);
  }
  regresar(): void {
    this.router.navigate(['/productos']);
  }
  

  }
  




