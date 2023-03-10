import { Router } from '@angular/router';
import {PasswordModule} from 'primeng/password';
import { MapaSiteComponent } from './area-cliente/Component/mapa-site/mapa-site.component';
import { ErroComponent } from './area-cliente/Component/erro/erro.component';
import { InflableComponent } from './area-cliente/Component/inflable/inflable.component';
import { AdornoComponent } from './area-cliente/Component/adorno/adorno.component';
import { MesaComponent } from './area-cliente/Component/mesa/mesa.component';
import { SillaComponent } from './area-cliente/Component/silla/silla.component';
import { DetallesComponent } from './area-cliente/Component/detalles/detalles.component';
import { HomeComponent } from './area-cliente/Component/home/home.component';
import { NgModule } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CalendarModule } from 'primeng/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatBadgeModule } from '@angular/material/badge';
import { SidebarModule } from 'primeng/sidebar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavegadorInicialComponent } from './navegadores/Component/navegador-inicial/navegador-inicial.component';
import { NavegadorClienteComponent } from './navegadores/Component/navegador-cliente/navegador-cliente.component';
import { NavegadorAdministracionComponent } from './navegadores/Component/navegador-administracion/navegador-administracion.component';
import { EventService } from './services/Eventos/event-service.service';
import { CrearUsuariosComponent } from './logiarce/Component/crear-usuarios/crear-usuarios.component';
import { LogiComponent } from './logiarce/Component/logi/logi.component';
import { RecupeContraComponent } from './logiarce/Component/recupe-contra/recupe-contra.component';
import {DialogModule} from 'primeng/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CodigoRecuperacionComponent } from './logiarce/Component/codigo-recuperacion/codigo-recuperacion.component';
import { CartComponent } from './area-cliente/Component/cart/cart.component';
import { OrdenesComponent } from './area-cliente/Component/ordenes/ordenes.component';
import { PagoComponent } from './Pago/Component/pago/pago.component';
import { SucetfullComponent } from './Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { ErrorComponent } from './Dalogos/Error/error/error.component';
import { PagPrincipalComponent } from './pag-principal/pag-principal.component';
import { ConfirmarComponent } from './Dalogos/confirmar/confirmar.component';






@NgModule({
  declarations: [
    AppComponent,
    SillaComponent,
    MesaComponent,
    AdornoComponent,
    InflableComponent,
    ErroComponent,
    MapaSiteComponent,
    HomeComponent,
    DetallesComponent,
    NavegadorInicialComponent,
    NavegadorClienteComponent,
    NavegadorAdministracionComponent,
    CrearUsuariosComponent,
    LogiComponent,
    RecupeContraComponent,
    CodigoRecuperacionComponent,
    CartComponent,
    OrdenesComponent,
    PagoComponent,
    SucetfullComponent,
    ErrorComponent,
    PagPrincipalComponent,
    ConfirmarComponent

  ],
  imports: [
    
    PasswordModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MenuModule,
    DialogModule,
    BrowserModule,
    NzDatePickerModule,
    NzModalModule,
    NzDrawerModule,
    NzSpinModule,
    SidebarModule,
    AppRoutingModule,
    NzCalendarModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    CalendarModule,
    NzBadgeModule,
    NgxPayPalModule,
    MatBadgeModule,
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {    
  }
}
