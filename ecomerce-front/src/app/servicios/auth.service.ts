import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private roles: string[] = [];

  login(username: string, password: string) {
    // Simula una autenticación exitosa.
    this.isAuthenticated = true;
    // Simula roles del usuario (puedes obtener estos roles del servidor).
    this.roles = ['ROLE_ADMIN', 'ROLE_CLIENT', 'ROLE_EMPRENDEDOR'];
  }

  logout() {
    // Simula un cierre de sesión.
    this.isAuthenticated = false;
    this.roles = [];
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
}
