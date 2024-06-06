import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealizarCompraService } from '../../servicios/realizar-compra.service';

@Component({
  selector: 'app-realizar-compra',
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css']
})
export class RealizarCompraComponent implements OnInit {
  producto: any;
  emprendedor: any;

  constructor(
    private route: ActivatedRoute,
    private realizarCompraService: RealizarCompraService
  ) { }

  ngOnInit(): void {
    // Usar la notación de corchetes para acceder a 'productId'
    const productId = this.route.snapshot.params['productId']; 

    this.realizarCompraService.getProductDetails(productId).subscribe((data: any) => {
      this.producto = data; // Almacenar los detalles del producto
      this.emprendedor = data.user; // Almacenar los detalles del emprendedor
    });
  }

}
