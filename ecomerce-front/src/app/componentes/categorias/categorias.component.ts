import { Component, OnInit,inject } from '@angular/core';
import { AgregarCategoriasService } from '../../servicios/agregar-categorias.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorias',
  standalone:true,
  imports:[FormsModule,NgFor,MatIcon],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  router = inject(Router);
  categorias: string[] = [];
  nombreCategoria: string = '';

  constructor(private categoriaService: AgregarCategoriasService) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe(
      response => {
        this.categorias = response; // Asigna directamente el array de strings a categorias
      },
      error => {
        console.error('Error al listar categorías:', error);
      }
    );
  }

  agregarCategoria() {
    if (this.nombreCategoria.trim() !== '') {
      this.categoriaService.agregarCategoria(this.nombreCategoria).subscribe(
        response => {
          console.log('Categoría añadida exitosamente:', response);
          this.listarCategorias();
          this.nombreCategoria = '';
        },
        error => {
          console.error('Error al añadir categoría:', error);
        }
      );
    } else {
      console.error('El nombre de la categoría no puede estar vacío');
    }
  }

  eliminarCategoria(nombre: string) {
    if (nombre) {
      this.categoriaService.eliminarCategoria(nombre).subscribe(
        response => {
          console.log('Categoría eliminada exitosamente:', response);
          // Recargar la página después de eliminar la categoría
          location.reload();
        },
        error => {
          console.error('Error al eliminar categoría:', error);
          this.refreshrl();
        }
      );
    } else {
      console.error('El nombre de la categoría no puede estar vacío');
    }
  }
  refreshrl(){
    const currentUrl = this.router.url; this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => { 
      this.router.navigate([currentUrl]); });
  }


  regresar() {
    this.router.navigate(['/home'])
    // Implementa la lógica para regresar a la vista anterior
  }
}

//Implementa la lógica para regresar a la vista anterior



