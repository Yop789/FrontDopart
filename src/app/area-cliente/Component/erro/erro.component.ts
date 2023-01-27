import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MostrarCatalogoService } from 'src/app/services/mostrar-catalogo.service';

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
