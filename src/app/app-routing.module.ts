import { ErroComponent } from './area-cliente//Component/erro/erro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesComponent } from './area-cliente/Component/detalles/detalles.component';
import { HomeComponent } from './area-cliente/Component/home/home.component';
import { LoginComponent } from './area-cliente/Component/login/login.component';
import { SillaComponent } from './area-cliente/Component/silla/silla.component';
import { MesaComponent } from './area-cliente/Component/mesa/mesa.component';
import { InflableComponent } from './area-cliente/Component/inflable/inflable.component';
import { AdornoComponent } from './area-cliente/Component/adorno/adorno.component';

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'details',
    component: DetallesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
