import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderProduct } from 'src/app/models/order/order.module';
import { ControllerService } from 'src/app/services/cart/controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carga: OrderProduct[] = [];
  total = 0;
  url = environment.urlImagen;
  constructor(
    private controllerService:ControllerService,
    private router: Router,
  ) { 
    this.controllerService.events$.subscribe(events => {
      this.carga=events.list
      this.total=events.list.length
    });
  }

  ngOnInit(): void {
  }
  eliminar(id: string) {
    this.controllerService.eliminarProduct(id)
  }
  detalle(idPoduct: string) {
    localStorage.setItem('idProduct', idPoduct);
    this.router.navigateByUrl('/details');
  }
}
