import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatSidenavContainer, MatSidenav} from '@angular/material/sidenav';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentaBancariaComponent } from './componentes/cuenta-bancaria/cuenta-bancaria.component';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { GestionUsuariosComponent } from './componentes/gestion-usuarios/gestion-usuarios.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,
    HeaderComponent,FooterComponent,
    HomeComponent, RegistroComponent,
    LoginComponent,MatSidenavContent,
    MatSidenav,MatSidenavContainer,
    HttpClientModule,FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,
  MatCardModule,MatSnackBarModule,ReactiveFormsModule,MatButton,MatIcon,CuentaBancariaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecomerce-front';
}
