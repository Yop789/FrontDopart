import { MatSnackBar } from '@angular/material/snack-bar';
import { ControllerService } from './../../../services/cart/controller.service';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { EventService } from './../../../services/Eventos/event-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from 'src/app/area-cliente/Component/cart/cart.component';

@Component({
  selector: 'app-navegador-cliente',
  templateUrl: './navegador-cliente.component.html',
  styleUrls: ['./navegador-cliente.component.css']
})
export class NavegadorClienteComponent implements OnInit {
  total=0
  items: MenuItem[]=[];
  constructor(
    private router:Router,
    private event:EventService,
    private iniciarSesionService:IniciarSesionService,
    private controllerService:ControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
   
   }

  ngOnInit(): void {
    this.controllerService.listen().subscribe((date:any)=>{
      this.total=date.items
    })
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
    if(this.total>0){
    this.dialog.open(CartComponent,{
      panelClass:'cart',
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms'
    })
    }else{
      this.alert('no has agregado dingun articulo al carrito')
    }

  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
}
