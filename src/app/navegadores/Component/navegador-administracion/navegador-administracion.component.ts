import { Router } from '@angular/router';
import { ControllerService } from './../../../services/cart/controller.service';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegador-administracion',
  templateUrl: './navegador-administracion.component.html',
  styleUrls: ['./navegador-administracion.component.css']
})
export class NavegadorAdministracionComponent implements OnInit {

  constructor(private router:Router,private iniciarSesionService:IniciarSesionService,private controllerService:ControllerService) {
     
   }

  ngOnInit(): void {
  }
  salir() {
    this.iniciarSesionService.emit(true, true, false);
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/principal');
    this.controllerService.setCarController();
  }
  opcionesAdminds(ruta:string){
    this.router.navigateByUrl(ruta);
  }
}
