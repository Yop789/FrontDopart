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

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: DetallesComponent,
  },
  {
    path: 'sillas',
    component: SillaComponent,
  },
  {
    path: 'mesas',
    component: MesaComponent,
  },
  {
    path: 'inflables',
    component: InflableComponent,
  },
  {
    path: 'adornos',
    component: AdornoComponent,
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
    component: MapaSiteComponent
  },
  { path: 'Admin', loadChildren: () => import('./area-admin/area-admin.module').then(m => m.AreaAdminModule) },
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
