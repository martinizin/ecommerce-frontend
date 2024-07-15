import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentRole = localStorage.getItem('rol');

    if (currentRole && expectedRole.includes(currentRole)) {
      return true;
    } else {
      this.router.navigate(['/login']); // O redirige a una página de acceso denegado
      return false;
    }
  }
}
