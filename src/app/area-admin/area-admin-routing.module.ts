import { AreaAdminComponent } from './area-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: 'Administrativo',
  component: AreaAdminComponent,
},
{
  path: '',
  redirectTo: 'Administrativo',
  pathMatch: 'full',
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaAdminRoutingModule { }
