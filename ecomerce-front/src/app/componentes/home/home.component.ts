import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatList } from '@angular/material/list';
import { MatNavList } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { RegistroService } from '../../servicios/registro.service';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavContainer, MatToolbar,
    MatSidenavContent, MatIcon,
    MatSidenav, MatList,
    MatNavList, CommonModule, NgIf, MatOption,
    MatFormField, MatSelect,MatLabel, 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  registroService = inject(RegistroService);
  router = inject(Router);
  username: string | null = null;
  selectedOption: any;
  isLogged: boolean = false;
  showUploadButton: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.isLogged = this.isLoggedIn();
    if (this.isLogged) {
      this.username = this.registroService.getUsername();
     
    }
  }

  isLoggedIn(): boolean {
    return this.registroService.loggedIn();
  }

  logout(): void {
    this.registroService.logoutUser();
    this.router.navigate(['/login']);
  }
  toggleUploadProduct(): void {
    this.showUploadButton = !this.showUploadButton;
  }

  navigateToCreate(): void {
    this.router.navigate(['/crear']);
  }
  navigateToListar(): void {
    this.router.navigate(['/listar']);
  }

}
