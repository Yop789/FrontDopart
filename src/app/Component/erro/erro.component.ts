import { Router } from '@angular/router';
import { MostrarCatalogoService } from './../../services/mostrar-catalogo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  constructor(
    private router:Router,
    private mostrarCatalogoService:MostrarCatalogoService
  ) {
    
   }

  ngOnInit(): void {
    this.mostrarCatalogoService.Mostrab(true);
  }
  home(){
    this.router.navigateByUrl("/home")
  }
}
