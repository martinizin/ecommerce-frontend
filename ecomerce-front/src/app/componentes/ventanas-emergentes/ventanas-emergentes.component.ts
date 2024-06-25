import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ventanas-emergentes',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './ventanas-emergentes.component.html',
  styleUrl: './ventanas-emergentes.component.css'
})
export class VentanasEmergentesComponent {
  constructor(
    private dialogRef: MatDialogRef<VentanasEmergentesComponent>,
    private router: Router  // Inyecta el Router para redirigir al usuario.
  ) {}

  closeDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo.
    this.router.navigate(['/mis-compras']);  // Redirige al usuario.
  }
}
