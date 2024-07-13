import { Component, OnInit,inject } from '@angular/core';
import { ListadoUsuariosService } from '../../servicios/listado-usuarios.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [MatToolbar,MatIcon,NgFor,NgIf],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit {
  router = inject(Router);
  users:any[]=[];
  displayedColumns: string[] = ['id', 'email', 'username', 'numero','rol', 'actions'];
  constructor(private listadoUsuarios:ListadoUsuariosService ){
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }
  listarUsuarios():void{
    this.listadoUsuarios.listarUsuarios().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    

    }
eliminarUsuario(userId:number):void{
  this.listadoUsuarios.eliminarUsuario(userId).subscribe(
    () => {
      this.users = this.users.filter(user => user.id !== userId);
     
    },
    error => {
      console.error('Error deleting user:', error);
      this.refreshrl();
    }
    
  );


  }
  refreshrl(){
    const currentUrl = this.router.url; this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => { 
      this.router.navigate([currentUrl]); });
  }

  regresar(){
    this.router.navigate(['/home'])
  }
  

  }

