import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';


export const routes: Routes = [
    {path :'',redirectTo:'login',pathMatch:'full'},
    {path: 'register',component:RegistroComponent},
    {path: 'login',component:LoginComponent},
    {path: 'home',component:HomeComponent}
];
