import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './servicios/auth.service';
import { Roles } from './modelos/roles';
//Luego, en src/app/auth.guard.ts, importa los roles desde el archivo roles.ts y define permisos de acceso parametrizados en cada ruta:
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticatedUser()) {
      // Define permisos de acceso para cada ruta.
      const allowedRoles = route.data['Roles'] as string[];
      if (!Roles || allowedRoles.length === 0 || allowedRoles.some(Roles => this.authService.hasRole(Roles))) {
        return true;
      }
    }
    // Redirige al usuario a la página de inicio de sesión si no tiene acceso.
    // Puedes usar window.location.href o router.navigate según tus necesidades.
    window.location.href = '/login'; 
    return false;
  }
}