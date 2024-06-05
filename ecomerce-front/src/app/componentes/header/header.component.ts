import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';
import { Route } from '@angular/router';
import { routes } from '../../app.routes';
import { MatOption } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { RegistroService } from '../../servicios/registro.service';
import { CrudProductosService } from '../../servicios/crud-productos.service';
import { MatLabel } from '@angular/material/form-field';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    NgIf,
    MatOption,MatFormField,
    MatLabel,MatSelect,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  username: any = null; // Para almacenar la información del usuario
  userRoles:string[]=[];
  selectedOption: string | undefined; // Para almacenar la opción seleccionada del combo box

  constructor(private router: Router,private authService:RegistroService, private crudService:CrudProductosService) {}

  ngOnInit(): void {
    this.userLoginOn = !!this.authService.getToken();
    this.username = this.authService.getUsername();
    this.userRoles = this.authService.getRoles();
  }
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  navigateToCreate(){
    this.router.navigate(['/crear']);

  }
  navigateToListar(){
    this.router.navigate(['/listar']);

  }
  addCategoria(){
    this.router.navigate(['/home']);
  }

  onSelectionChange(event: any): void {
    if (event.value === 'account') {
      this.navigateTo('/account'); // Redirigir a la página de cuenta
    } else if (event.value === 'logout') {
      this.logout(); // Cerrar sesión
    }
  }

  logout(): void {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
    // Limpiar datos de usuario y redirigir al login
    this.userLoginOn = false;
    this.username = null;
    this.router.navigate(['/login']);
  }
}
