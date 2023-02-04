import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  constructor(
    private breadcrumbService:BreadcrumbService
  ) {
    this.PaginaName()
   }

  ngOnInit(): void {
    
  }
  PaginaName(){
    this.breadcrumbService.setBreadcrumb('Registrarce','registrarce')
  }


}
