import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alertalogin',
  standalone: true,
  imports: [],
  templateUrl: './alertalogin.component.html',
  styleUrl: './alertalogin.component.css'
})
export class AlertaloginComponent {
  constructor(
    private dialogRef: MatDialogRef<AlertaloginComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
    // Redirige al usuario.
  }
}
