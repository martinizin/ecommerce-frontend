import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ResetContrasenaComponent } from './componentes/reset-contrasena/reset-contrasena.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { FormularioProductosComponent } from './componentes/formulario-productos/formulario-productos.component';
import { AuthGuard } from './auth.guard';
import { Roles } from './modelos/roles';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { RealizarCompraComponent } from './componentes/realizar-compra/realizar-compra.component';
import { GestionUsuariosComponent } from './componentes/gestion-usuarios/gestion-usuarios.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { ListadoProductosComponent } from './componentes/listado-productos/listado-productos.component';
import { CarritoComprasComponent } from './componentes/carrito-compras/carrito-compras.component';
import { MisComprasComponent } from './componentes/mis-compras/mis-compras.component';
import { MisVentasComponent } from './componentes/mis-ventas/mis-ventas.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CuentaBancariaComponent } from './componentes/cuenta-bancaria/cuenta-bancaria.component';
import { FormularioCuentaBancariaComponent } from './componentes/formulario-cuenta-bancaria/formulario-cuenta-bancaria.component';
import { VentanasEmergentesComponent } from './componentes/ventanas-emergentes/ventanas-emergentes.component';
import { SendResetComponent } from './componentes/send-reset/send-reset.component';
import { LoginGuard } from './login.guard';
import { RoleGuard } from './rol.guard';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path :'',redirectTo:'dashboard',pathMatch:'full'},
    { path: 'register',component:RegistroComponent},
    { path: 'login',component:LoginComponent},
    { path: 'home', component: HomeComponent, canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_CLIENT','ROLE_EMPRENDEDOR'] }}, //, canActivate: [AuthGuard] },
    { path: 'send-reset', component: SendResetComponent },
    { path: 'reset-password', component:ResetContrasenaComponent },
    { path: '', redirectTo: '/send-reset', pathMatch: 'full' },
    { path: 'listar',component:ProductosComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path: 'listar-id',component:ProductosComponent, canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path: 'crear',component:FormularioProductosComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path: 'modificar/:id',component:FormularioProductosComponent, canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path: 'modificar',component:FormularioProductosComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path:'productos',component:ClientesComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR','ROLE_CLIENT']}},
    { path:'crear-cuenta-bancaria',component:FormularioCuentaBancariaComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_EMPRENDEDOR','ROLE_CLIENT']}},
    //{path:'cuenta-bancaria/:idEmprendedor',component:CuentaBancariaComponent},
    { path:'cuenta-bancaria',component:CuentaBancariaComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_EMPRENDEDOR','ROLE_CLIENT']}},
    { path:'realizar-compra',component:RealizarCompraComponent, canActivate: [RoleGuard],data: { expectedRole: ['ROLE_EMPRENDEDOR','ROLE_CLIENT']}},
    //TODO: {path:'modificar-categoria/:id',component:CategoriasComponent}, //:id simboliza el id en 'modificar/id' en ruta
    { path:'crear-categoria',component:CategoriasComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_EMPRENDEDOR']}},
    { path: 'listar-usuarios',component:ListadoUsuariosComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN']}},
    { path:'todos-productos',component:ListadoProductosComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_CLIENT']}},
    { path: 'carrito', component: CarritoComprasComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_CLIENT','ROLE_ADMIN']} },
    { path:'fin-compra',component:VentanasEmergentesComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_ADMIN','ROLE_CLIENT','ROLE_EMPRENDEDOR']}},
    { path:'mis-compras',component:MisComprasComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_CLIENT','ROLE_EMPRENDEDOR']}},
    { path:'mis-ventas',component:MisVentasComponent,canActivate: [RoleGuard],data: { expectedRole: ['ROLE_CLIENT','ROLE_EMPRENDEDOR']}},
    { path: '**', redirectTo: 'dashboard' } ,
    //{ path: 'home', canActivate: [AuthGuard], data: { roles: [Roles.EMPRENDEDOR, Roles.ADMIN,Roles.CLIENTE] }, component: HomeComponent },
];
