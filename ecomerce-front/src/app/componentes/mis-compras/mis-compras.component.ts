import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mis-compras',
  standalone: true,
  imports: [],
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  constructor(
    private router: Router
  ){}
 
 
  regresar(): void {
    this.router.navigate(['/home']);
  }
}
