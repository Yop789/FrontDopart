import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaAdminRoutingModule } from './area-admin-routing.module';
import { AreaAdminComponent } from './area-admin.component';
import { AdministradorComponent } from './Component/administrador/administrador.component';
import { NuevoProductoComponent } from './Component/nuevo-producto/nuevo-producto.component';
import { UsuariosComponent } from './Component/usuarios/usuarios.component';
import { MatIconModule } from '@angular/material/icon';
import { AgregarArtirticulosComponent } from './Component/agregar-artirticulos/agregar-artirticulos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionService } from '../services/Login/iniciar-sesion.service';
import { Router } from '@angular/router';
import { PedidosComponent } from './Component/pedidos/pedidos.component';

@NgModule({
  declarations: [
    AreaAdminComponent,
    AdministradorComponent,
    NuevoProductoComponent,
    UsuariosComponent,
    AgregarArtirticulosComponent,
    PedidosComponent,
  ],
  imports: [
    CommonModule,
    AreaAdminRoutingModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AreaAdminModule {
  constructor(
    private iniciarSesionService: IniciarSesionService,
    private router: Router
  ) {
    if (localStorage.getItem('token') == '') {
      this.router.navigateByUrl('home');
    }else{
      this.iniciarSesionService.admin()
    }
  }
}
