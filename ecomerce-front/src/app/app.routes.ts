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
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { RealizarCompraComponent } from './componentes/realizar-compra/realizar-compra.component';
import path from 'node:path';
import { GestionUsuariosComponent } from './componentes/gestion-usuarios/gestion-usuarios.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';

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
    {path: 'modificar/:id',component:FormularioProductosComponent},
    {path: 'modificar',component:FormularioProductosComponent},
    {path:'productos',component:ClientesComponent},
    {path:'realizar-compra',component:RealizarCompraComponent},
    //TODO: {path:'modificar-categoria/:id',component:CategoriasComponent}, //:id simboliza el id en 'modificar/id' en ruta
    {path:'crear-categoria',component:CategoriasComponent},
    {path: 'mis-compras',component:ProductosComponent},
    {path: 'listar-usuarios',component:ListadoUsuariosComponent},
    {path:'todos-productos',component:ListadoProductosComponent}
   // { path: 'Home', canActivate: [AuthGuard], data: { roles: [Roles.EMPRENDEDOR, Roles.ADMIN,Roles.CLIENTE] }, component: HomeComponent },
];
