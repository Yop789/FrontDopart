import { ControllerService } from './../../../services/cart/controller.service';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { EventService } from './../../../services/Eventos/event-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegador-cliente',
  templateUrl: './navegador-cliente.component.html',
  styleUrls: ['./navegador-cliente.component.css']
})
export class NavegadorClienteComponent implements OnInit {
  total=0
  constructor(
    private router:Router,
    private event:EventService,
    private iniciarSesionService:IniciarSesionService,
    private controllerService:ControllerService
  ) {
    this.controllerService.events$.subscribe(events => {
      this.total=events.list.length
    });
   }

  ngOnInit(): void {
  }
  mostrarMenu(pagina:string) {
    this.router.navigateByUrl(`/${pagina}`);
  }
  salir() {
    this.iniciarSesionService.emit(true,true,false)
    localStorage.setItem('IdClient','')
    this.router.navigateByUrl('/home')
    
  }
  mostrarCarrito(){
    this.event.emit(false)
  }
}
