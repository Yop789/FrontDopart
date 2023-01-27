import { MostrarCatalogoService } from './../services/mostrar-catalogo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaAdminRoutingModule } from './area-admin-routing.module';
import { AreaAdminComponent } from './area-admin.component';

@NgModule({
  declarations: [
    AreaAdminComponent
  ],
  imports: [
    CommonModule,
    AreaAdminRoutingModule
  ],
})
export class AreaAdminModule {
  constructor(
    private mostrarCatalogoService: MostrarCatalogoService
  ){
    this.mostrarCatalogoService.Mostrab(true);
  }
  
 }
