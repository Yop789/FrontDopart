import { ControllerService } from './services/cart/controller.service';
import { IniciarSesionService } from './services/Login/iniciar-sesion.service';
import { Component, DoCheck, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: BeforeUnloadEvent) {
    event.preventDefault();
    this.controllerService.setCarController();
    // this.iniciarSesionService.eliminarToken();
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandle(event: BeforeUnloadEvent) {
    event.preventDefault();
    this.controllerService.setCarController();
    // this.iniciarSesionService.eliminarToken();
  }

  client = true;
  admin = true;
  iniciar = false;
  breadcrumb: any = [];
  constructor(
    private router: Router,
    private ini: IniciarSesionService,
    private controllerService: ControllerService,
    private iniciarSesionService: IniciarSesionService,
    private breadcrumbService:BreadcrumbService  ) {}
  ngDoCheck() {
    
    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
  }

  ngOnInit() {
    this.ini.listen().subscribe((data) => {
      this.client = data.cliente;
      this.admin = data.admin;
      this.iniciar = data.sinSesion;
    });
    const token = `${localStorage.getItem('token')}`;
    const decodedToken: any = jwt_decode.default(token);
    if (decodedToken.roles[0] == 'user') {
      this.router.navigateByUrl('/home');
      this.iniciarSesionService.emit(false, true, true);
    } else {
      this.router.navigateByUrl('/admin');
      this.iniciarSesionService.emit(true, false, true);
    }
  }

  mostrarCatalogo(pagina: string) {
    this.router.navigateByUrl(`/${pagina}`);
  }
}
