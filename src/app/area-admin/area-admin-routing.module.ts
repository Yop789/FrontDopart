import { UsuariosComponent } from './Component/usuarios/usuarios.component';
import { OrdenesComponent } from './../area-cliente/Component/ordenes/ordenes.component';
import { AdministradorComponent } from './Component/administrador/administrador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoProductoComponent } from './Component/nuevo-producto/nuevo-producto.component';
import { AdminGuard } from './Authe/admin.guard';

const routes: Routes = [
{
  path: 'Administrativo',
  component: AdministradorComponent,
  canActivate: [AdminGuard] 
},
{
  path: '',
  redirectTo: 'Administrativo',
  pathMatch: 'full',
},
{
  path: 'nuevosProductos',
  component: NuevoProductoComponent,
  canActivate: [AdminGuard] 

},
{
  path: 'pedidos',
  component: OrdenesComponent,
  canActivate: [AdminGuard]
},
{
  path: 'usuarios',
  component: UsuariosComponent,
  canActivate: [AdminGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaAdminRoutingModule { }
