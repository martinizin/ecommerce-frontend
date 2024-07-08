import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enlace-verificacion',
  standalone: true,
  imports: [],
  templateUrl: './enlace-verificacion.component.html',
  styleUrl: './enlace-verificacion.component.css'
})
export class EnlaceVerificacionComponent {
  constructor(
    private dialogRef: MatDialogRef<EnlaceVerificacionComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
    this.router.navigate(['/login']);  // Redirige al login.
  }
}


