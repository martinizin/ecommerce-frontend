
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CuentaBancariaService } from '../../servicios/cuenta-bancaria.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CarritoCompraService } from '../../servicios/carrito-compra.service';
import { VentanasEmergentesComponent } from '../ventanas-emergentes/ventanas-emergentes.component';
import { privateDecrypt } from 'crypto';
import { ConfirmacionComprobanteComponent } from '../confirmacion-comprobante/confirmacion-comprobante.component';
@Component({
  selector: 'app-mi-cuenta-bancaria',
  standalone: true,
  imports: [FormsModule,MatCardModule,MatFormFieldModule,NgFor,NgIf],
  templateUrl: './mi-cuenta-bancaria.component.html',
  styleUrl: './mi-cuenta-bancaria.component.css'
})
export class MiCuentaBancariaComponent {
  productosAgrupados: any[] = [];
  grupoSeleccionado: any = null;
  isEmprendedor:boolean=false;
  cuentasBancarias: any[] = [];
  username: string | null = '';
  selectedFile: File | null = null;
  @Input() idEmprendedor:number=0;
  producto: any;
  @Input() total:number=0;
  @Output() returnEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() productsPurchased:EventEmitter<{productos: { id: number; cantidad: number; }[]}> = new EventEmitter<{productos: { id: number; cantidad: number; }[]}>();
  @Input() cartProducts:any[] =[];
    constructor(
    private cuentaBancariaService: CuentaBancariaService,
    private carritoService:CarritoCompraService,
    private router: Router,
    private route:ActivatedRoute,
    private dialog:MatDialog
  ) {}
  ngOnInit(): void {
    if(this.idEmprendedor)
      this.cargarCuentasBancarias(this.idEmprendedor);
    else
      this.cargarCuentasBancariasporEmprendedor(localStorage.getItem('username')||'');
    console.log(this.cartProducts);
  //  this.route.params.subscribe(params => {
  //   if (params['idEmprendedor']) {
  //     this.idEmprendedor = + params['idEmprendedor'];
  //     this.cargarCuentasBancarias(this.idEmprendedor);
  //   }
  //   else{
  //     this.cargarCuentasBancariasporIdEmprendedor(localStorage.getItem('username')||'');
  //   }
    
  //   this.carritoService.carrito$.subscribe(productos => {
  //     this.productosAgrupados = this.agruparProductosPorEmprendedor(productos);
  //   });

  //   this.route.queryParams.subscribe(params=>{
  //     if(params['total']){
  //       this.total = +params['total'];
  //     }
  //   })
  // });

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

  cargarCuentasBancarias(id:number): void {
    this.cuentaBancariaService.listarCuentasBancarias().subscribe(
      response => {
        this.cuentasBancarias = response.filter((x:any)=> x.iduser.id == id);
      },
      error => {
        console.error('Error al listar cuentas:', error);
      }
    );
}
cargarCuentasBancariasporEmprendedor(username:string):void{
  this.cuentaBancariaService.listarCuentasBancarias().subscribe(
    response=>{
      this.cuentasBancarias=response.filter((x:any)=>x.iduser.username.includes(username));
    }
  )
  
}
CuentaporId(idCuenta:number){
  this.cuentaBancariaService.listarCuentasBancariasPorId(idCuenta);
}
 
}
