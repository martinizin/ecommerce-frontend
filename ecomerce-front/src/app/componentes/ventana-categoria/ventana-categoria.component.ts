import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ventana-categoria',
  standalone: true,
  imports: [],
  templateUrl: './ventana-categoria.component.html',
  styleUrl: './ventana-categoria.component.css'
})
export class VentanaCategoriaComponent {
  constructor(
    private dialogRef: MatDialogRef<VentanaCategoriaComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
    // Redirige al usuario.
  }
}
