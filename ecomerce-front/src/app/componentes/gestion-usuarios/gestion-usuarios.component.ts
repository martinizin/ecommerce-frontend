import { Component, OnInit,inject } from '@angular/core';
import { ListadoUsuariosService } from '../../servicios/listado-usuarios.service';
import { MatIcon } from '@angular/material/icon';
import { NgClass,NgFor,NgIf } from '@angular/common';
import { Router } from 'express';
@Component({
  selector: 'app-gestion-usuarios',
  standalone:true,
  imports:[MatIcon,NgClass,NgFor,NgIf],
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  router = inject(Router);
  users: any[] = [];

  constructor(private listadoUsuarioService: ListadoUsuariosService) { }

  ngOnInit(): void {
    
  }
  

  }

//   ListUsers(): void {
//     this.listadoUsuarioService.getUsers().subscribe(
//       data => {
//         console.log(this.users = data) 
//       },
//       error => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   deleteUser(userId: number): void {
//     this.listadoUsuarioService.deleteUser(userId).subscribe(
//       () => {
//         this.users = this.users.filter(user => user.id !== userId);
//       },
//       error => {
//         console.error('Error deleting user:', error);
//       }
//     );
//   }
//   trackById(index: number, producto: any): number {
//     return producto.id;
//   }
//   regresar(): void {
//     this.router.navigate(['/home']);
//   }
// }
