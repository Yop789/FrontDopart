import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private breadcrumbService:BreadcrumbService) { 
    this.breadcrumbService.setBreadcrumb('Pedidos','admin/pedidos')
  }

  ngOnInit(): void {
  }

}
