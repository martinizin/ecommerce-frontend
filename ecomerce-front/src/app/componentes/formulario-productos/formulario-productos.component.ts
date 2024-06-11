import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor,NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgClass,
    NgFor,
    NgIf,
  ],
  templateUrl: './formulario-productos.component.html',
  styleUrls: ['./formulario-productos.component.css']
})
export class FormularioProductosComponent implements OnInit {
  form: FormGroup;
  categoria: string[] = ['ARTESANIAS', 'ALIMENTOS', 'ROPA', 'OTROS'];
  imagen: File | undefined;
  productoId: number | undefined;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nomproducto: ['', [Validators.required]],
      descripcionproducto: ['', [Validators.required]],
      stockproducto: ['', [Validators.required]],
      precioprducto: ['', [Validators.required]],
      imagen: [''],
      categoria: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productoId = +params['id'];
        this.isEditing = true;
        this.loadProduct();
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagen = file;
    }
  }

  createOrUpdate() {
    const formData = new FormData();
    const producto = this.form.value;

    // Append form fields
    formData.append('nomproducto', producto.nomproducto);
    formData.append('descripcionproducto', producto.descripcionproducto);
    formData.append('stockproducto', producto.stockproducto);
    formData.append('precioprducto', producto.precioprducto);
    formData.append('categoria', producto.categoria);
    
    // Append image file if exists
    if (this.imagen) {
      formData.append('imagen', this.imagen);
    }
    if (this.isEditing && this.productoId) {
      this.crudService.update(this.productoId, producto).subscribe(
        response => {
          console.log('Producto actualizado:', response);
          this.router.navigate(['/listar']);
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      this.crudService.create(producto).subscribe(
        response => {
          console.log('Producto creado:', response);
          this.router.navigate(['/listar']);
        },
        error => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }
  

  loadProduct() {
    if (this.productoId) {
      this.crudService.get(this.productoId).subscribe(
        response => {
          this.form.patchValue(response);
        },
        error => {
          console.error('Error al cargar el producto:', error);
          // Manejar el error, mostrar mensaje al usuario, etc.
        }
      );
    }
  }

  delete() {
    if (this.productoId) {
      this.crudService.delete(this.productoId).subscribe(
        response => {
          console.log('Producto eliminado:', response);
          this.router.navigate(['/listar']);
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          // Manejar el error, mostrar mensaje al usuario, etc.
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/listar']);
  }

  private prepareFormData(): FormData {
    const producto = this.form.value;
    const formData = new FormData();
    formData.append('nomproducto', producto.nomproducto);
    formData.append('descripcionproducto', producto.descripcionproducto);
    formData.append('stockproducto', producto.stockproducto);
    formData.append('precioprducto', producto.precioprducto);
    formData.append('categoria', producto.categoria);
    return formData;
  }

  private uploadImage(productoId: number, image: File): void {
    this.crudService.uploadImage(productoId, image).subscribe(
      response => {
        console.log('Imagen subida correctamente:', response);
      },
      error => {
        console.error('Error al subir la imagen:', error);
        // Manejar el error, mostrar mensaje al usuario, etc.
      }
    );
  }
  

  }