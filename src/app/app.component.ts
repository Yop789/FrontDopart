import { ControllerService } from './services/cart/controller.service';
import { IniciarSesionService } from './services/Login/iniciar-sesion.service';
import {
  Component,
  DoCheck,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from './services/breadcrumb.service';

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
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandle(event: BeforeUnloadEvent) {
    event.preventDefault();
    this.controllerService.setCarController();
  }

  client = true;
  admin = true;
  iniciar = false;
  breadcrumb: any = [];
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private ini: IniciarSesionService,
    private controllerService: ControllerService,

  ) {
  }
  ngDoCheck() {
    this.breadcrumb = this.breadcrumbService.getBreadcrumb();
  }

  ngOnInit() {
    
    this.ini.listen().subscribe((data) => {
      this.client = data.cliente;
      this.admin = data.admin;
      this.iniciar = data.sinSesion;
    });
    this.breadcrumbService.setBreadcrumb('Home', 'home');
  }

  mostrarCatalogo(pagina: string) {
    this.router.navigateByUrl(`/${pagina}`);
  }
}
