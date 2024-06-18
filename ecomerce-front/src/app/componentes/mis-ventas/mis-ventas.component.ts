import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-ventas',
  standalone: true,
  imports: [],
  templateUrl: './mis-ventas.component.html',
  styleUrl: './mis-ventas.component.css'
})
export class MisVentasComponent {
  constructor(
    private router: Router
  ){}
 
 
  regresar(): void {
    this.router.navigate(['/home']);
  }
}
