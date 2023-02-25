import { MapaSiteComponent } from './area-cliente/Component/mapa-site/mapa-site.component';
import { CrearUsuariosComponent } from './logiarce/Component/crear-usuarios/crear-usuarios.component';
import { ErroComponent } from './area-cliente//Component/erro/erro.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './area-cliente/Component/detalles/detalles.component';
import { HomeComponent } from './area-cliente/Component/home/home.component';
import { SillaComponent } from './area-cliente/Component/silla/silla.component';
import { MesaComponent } from './area-cliente/Component/mesa/mesa.component';
import { InflableComponent } from './area-cliente/Component/inflable/inflable.component';
import { AdornoComponent } from './area-cliente/Component/adorno/adorno.component';
import { LogiComponent } from './logiarce/Component/logi/logi.component';
import { CartComponent } from './area-cliente/Component/cart/cart.component';
import { UserGuard } from './services/authe/user.guard';
import { PagPrincipalComponent } from './pag-principal/pag-principal.component';

const routes: Routes = [
  
  {
    path: 'principal',
    component: PagPrincipalComponent
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'details',
    component: DetallesComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'sillas',
    component: SillaComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'mesas',
    component: MesaComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'inflables',
    component: InflableComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'adornos',
    component: AdornoComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'registrarce',
    component: CrearUsuariosComponent
  },
  {
    path: 'iniciarSesion',
    component: LogiComponent
  },
  {
    path: 'Mapa',
    component: MapaSiteComponent,
    canActivate: [UserGuard]
  },
  {
    path:'cart',
    component: CartComponent,
    canActivate: [UserGuard]
  },
  { path: 'admin', loadChildren: () => import('./area-admin/area-admin.module').then(m => m.AreaAdminModule) },
  {
    path: '**',
    component:ErroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
