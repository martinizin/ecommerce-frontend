import { Component, OnInit} from '@angular/core';
import { CuentaBancariaService } from '../../servicios/cuenta-bancaria.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { RegistroService } from '../../servicios/registro.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CarritoCompraService } from '../../servicios/carrito-compra.service';
@Component({
  selector: 'app-cuenta-bancaria',
  standalone:true,
  imports:[FormsModule,MatCardModule,MatFormFieldModule,NgFor,NgIf],
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css']
})
export class CuentaBancariaComponent implements OnInit{
  productosAgrupados: any[] = [];
  grupoSeleccionado: any = null;
  isEmprendedor:boolean=false;
  cuentasBancarias: any[] = [];
  username: string | null = '';
  selectedFile: File | null = null;
  idEmprendedor:number=0;
  producto: any;
  constructor(
    private cuentaBancariaService: CuentaBancariaService,
    private carritoService:CarritoCompraService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

 
  ngOnInit(): void {

   this.route.params.subscribe(params => {
    if (params['idEmprendedor']) {
      this.idEmprendedor = + params['idEmprendedor'];
     
      this.cargarCuentasBancarias(this.idEmprendedor);
    }
    else{
      this.cargarCuentasBancariasporIdEmprendedor(localStorage.getItem('id')||'');
      
    }
    this.carritoService.carrito$.subscribe(productos => {
      this.productosAgrupados = this.agruparProductosPorEmprendedor(productos);
    });
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
cargarCuentasBancariasporIdEmprendedor(username:string):void{
  this.cuentaBancariaService.listarCuentasBancarias().subscribe(
    response=>{
      this.cuentaBancariaService=response.filter((x:any)=>x.iduser.icludes.id);
    }
  )
  
}
CuentaporId(idCuenta:number){
  this.cuentaBancariaService.listarCuentasBancariasPorId(idCuenta);
}


onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
}

subirComprobante(cuenta: any): void {
  if (this.selectedFile) {
    const productoId = cuenta.idCuenta; // Suponiendo que idCuenta se usa como identificador
    this.cuentaBancariaService.subirComprobante(productoId, this.selectedFile).subscribe(response => {
      console.log('Comprobante subido:', response);
      // Aquí puedes añadir lógica adicional después de subir el comprobante
    });
  }
}
crearCuentaBancaria(){
  this.router.navigate(['/crear-cuenta-bancaria'])
}
regresar(): void {
  this.router.navigate(['/home']);
}
regresarAProductos(): void {
  this.router.navigate(['/carrito']);
}
realizarCompra(): void {
  this.router.navigate(['/compra-realizada']);
}


}