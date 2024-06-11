import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RealizarCompraService } from '../../servicios/realizar-compra.service';
import { RegistroService } from '../../servicios/registro.service';

@Component({
  selector: 'app-realizar-compra',
  templateUrl: './realizar-compra.component.html',
  styleUrls: ['./realizar-compra.component.css']
})
export class RealizarCompraComponent implements OnInit {
  registroService = inject(RegistroService);
  router = inject(Router);
  producto: any;
  emprendedor: any;
  imagenFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private realizarCompraService: RealizarCompraService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId']; 

    this.realizarCompraService.getProductDetails(productId).subscribe((data: any) => {
      this.producto = data; 
      this.emprendedor = data.user; 
    });
  }

  subirComprobante(): void {
    if (this.imagenFile) {
      this.realizarCompraService.subirComprobante(this.imagenFile).subscribe(
        response => {
          console.log('Imagen subida exitosamente:', response);
          // Aquí puedes manejar la respuesta del servidor si es necesario
        },
        error => {
          console.error('Error al subir la imagen:', error);
          // Aquí puedes manejar el error si ocurre
        }
      );
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
    }
  }

  onImagenSeleccionada(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.imagenFile = files[0];
    }
  }
  regresar(){
    this.router.navigate(['/productos'])
  }
}
