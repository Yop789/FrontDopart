import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(
    private breadcrumbService:BreadcrumbService
  ) {
    this.breadcrumbService.setBreadcrumb('Usuarios','admin/usuarios')
   }

  ngOnInit(): void {
  }

}
