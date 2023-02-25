import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(
    private breadcrumbService:BreadcrumbService
  ) { 
    this.breadcrumbService.vaciarBreadcrumb()
    this.breadcrumbService.setBreadcrumb('Home','admin/Administrativo')
  }

  ngOnInit(): void {
  }

}
