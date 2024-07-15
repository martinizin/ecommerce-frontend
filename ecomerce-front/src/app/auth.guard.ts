import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticatedUser()) {
      // Define permisos de acceso para cada ruta.
      const allowedRoles = route.data['roles'] as string[];
      if (!allowedRoles || allowedRoles.length === 0 || allowedRoles.some(role => this.authService.hasRole(role))) {
        return true;
      }
    }
    // Redirige al usuario a la página de inicio de sesión si no tiene acceso.
    this.router.navigate(['/login']);
    return false;
  }

  loginGuard=()=>{

    if(localStorage.getItem('token')){
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }
}
