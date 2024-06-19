import { Component , OnInit} from '@angular/core';
import { CarritoCompraService } from '../../servicios/carrito-compra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { ListadoProductosService } from '../../servicios/listado-productos.service';
import { MatDialog } from '@angular/material/dialog';
import { CuentaBancariaService } from '../../servicios/cuenta-bancaria.service';
@Component({
  selector: 'app-carrito-compras',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './carrito-compras.component.html',
  styleUrl: './carrito-compras.component.css'
})
export class CarritoComprasComponent implements OnInit{
  productosAgrupados: any[] = [];
  mostrarCuentaBancaria = false;
  grupoSeleccionado: any = null;
  constructor(
    private carritoCompraService: CarritoCompraService,
    private cuentaBancaria: CuentaBancariaService,
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
    console.log(`Comprando productos del emprendedor: ${grupo.emprendedor}`);
    console.log(`Productos:`, grupo.productos);
    console.log(`Total a pagar: $${grupo.total}`);
    this.cuentaBancaria.listarCuentasBancarias();
    console.log(`Cuentas Bancarias:`,grupo.listarCuentasBancarias);
    this.grupoSeleccionado = grupo;
    this.mostrarCuentaBancaria = true;
    
    this.router.navigate(['/cuenta-bancaria',grupo.productos[0].user.id ]);
    //console.log(grupo.productos[0].user.id)
  }

  quitarDelCarrito(producto: any): void {
    this.carritoCompraService.quitarProducto(producto);
  }
  regresar(): void {
    this.router.navigate(['/productos']);
  }

  manejarComprobanteSubido(event: any): void {
    // Manejar la lógica una vez que el comprobante ha sido subido
    console.log('Comprobante subido:', event);
    this.mostrarCuentaBancaria = false;
    this.grupoSeleccionado = null;
  }

  }

  




