import { BreadcrumbService } from './../services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.css']
})
export class PagPrincipalComponent implements OnInit {

  constructor(
    private BreadcrumbService:BreadcrumbService
  ) { 
    this.BreadcrumbService.vaciarBreadcrumb()
    this.BreadcrumbService.setBreadcrumb('Principal','principal')
  }

  ngOnInit(): void {
  }
  
  
}
