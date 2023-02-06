import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct } from 'src/app/models/order/order.module';
import { ControllerService } from 'src/app/services/cart/controller.service';
import { environment } from 'src/environments/environment';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carga: OrderProduct[] = [];
  total = 0;
  precioOrder = 0;
  piezas = 0;
  url = environment.urlImagen;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private controllerService: ControllerService,
    private router: Router,
    private ProcessPaymentService: ProcessPaymentService
  ) {
    this.controllerService.events$.subscribe((events) => {
      this.carga = events.list;
      this.total = events.list.length;
    });

    this.precioOrderCart();
  }

  ngOnInit(): void {
    this.payPalConfig = this.ProcessPaymentService.initConfig();
  }
  eliminar(id: string) {
    this.controllerService.eliminarProduct(id);
  }
  detalle(idPoduct: string) {
    localStorage.setItem('idProduct', idPoduct);
    this.router.navigateByUrl('/details');
  }
  precioOrderCart() {
    this.controllerService.getCostOrder().subscribe((date: any) => {
      this.precioOrder = date.sumaCostos;
      this.piezas = date.cantidadItem;
    });
  }
  btnVaciar() {
    this.controllerService.vaciar();
    this.controllerService.events$.subscribe((events) => {
      this.carga = events.list;
      this.total = events.list.length;
    });
  }
}
