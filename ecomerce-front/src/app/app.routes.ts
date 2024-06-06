import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ResetContrasenaComponent } from './componentes/reset-contrasena/reset-contrasena.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { FormularioProductosComponent } from './componentes/formulario-productos/formulario-productos.component';
import { AuthGuard } from './auth.guard';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { Roles } from './modelos/roles';
import { CategoriasComponent } from './componentes/categorias/categorias.component';

export const routes: Routes = [
    {path :'',redirectTo:'login',pathMatch:'full'},
    {path: 'register',component:RegistroComponent},
    {path: 'login',component:LoginComponent},
    { path: 'home', component: HomeComponent}, //, canActivate: [AuthGuard] },
    {path:'send-reset',component:ResetContrasenaComponent},
    { path: 'reset-contrasena', component: CambiarContrasenaComponent },
    {path: 'listar',component:ProductosComponent},
    {path: 'listar-id',component:ProductosComponent},
    {path: 'crear',component:FormularioProductosComponent},
    {path: 'modificar/:id',component:FormularioProductosComponent}, //:id simboliza el id en 'modificar/id' en ruta
    {path:'crear-categoria',component:CategoriasComponent},
    {path: 'mis-compras',component:ProductosComponent},
   // { path: 'Home', canActivate: [AuthGuard], data: { roles: [Roles.EMPRENDEDOR, Roles.ADMIN,Roles.CLIENTE] }, component: HomeComponent },
];
