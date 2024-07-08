import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirmacion-comprobante',
  standalone: true,
  imports: [],
  templateUrl: './confirmacion-comprobante.component.html',
  styleUrl: './confirmacion-comprobante.component.css'
})
export class ConfirmacionComprobanteComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmacionComprobanteComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
  }
}

