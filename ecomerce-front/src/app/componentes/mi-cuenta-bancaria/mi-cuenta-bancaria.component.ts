
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
  
  CuentaporId(idCuenta:number){
    this.cuentaBancariaService.listarCuentasBancariasPorId(idCuenta);
  }
}
