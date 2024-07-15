import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/home']); // o cualquier ruta a la que quieras redirigir al usuario autenticado
      return true;
    } else {
      this.router.navigate(['/dashboard'])
      return false;
      
    }
  }
}
