import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmacion-verificacion',
  standalone: true,
  imports: [],
  templateUrl: './confirmacion-verificacion.component.html',
  styleUrl: './confirmacion-verificacion.component.css'
})
export class ConfirmacionVerificacionComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmacionVerificacionComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
    this.router.navigate(['/login']);
  }
}