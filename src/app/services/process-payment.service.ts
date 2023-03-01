import { MensajesService } from './mensajes.service';
import { Injectable } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { Dta, Order, OrderProduct } from '../models/order/order.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetCartProductsService } from './cars-services/getCartProducts.service';
import { Cart, CartCostmer } from '../models/cart/cart.module';
import { OrderService } from './order.service';
import { DeleteCartProductsService } from './cars-services/deleteCartProducts.service';
import { UpdateCartProductsService } from './cars-services/updateCartProducts.service';
import { ControllerService } from './cart/controller.service';
import { CartComponent } from '../area-cliente/Component/cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ProcessPaymentService {
  cargaProduct: OrderProduct[] = [];
  user = '' + localStorage.getItem('idClient');
  totalPrecio = 0;
  nombre = '';
  municipio = '';
  comunidad = '';
  calle = '';
  numero = '';
  e_mail = '';
  tel = '';
  rangeDates!: Date;
  dateEvent!: Date;
  dateDeliver!: Date;
  dias = 0;
  payPalConfig?: IPayPalConfig;

  constructor(
    private getCartProductsService: GetCartProductsService,
    private orderService: OrderService,
    private deleteCartProductsService: DeleteCartProductsService,
    private mensajesService: MensajesService,
    private controllerService: ControllerService,
    private dialog: MatDialog,
  ) {
    this.controllerService.getCostOrder().subscribe((date: any) => {
      this.totalPrecio = date.sumaCostos;
    });
  }
  setDate(date: Dta) {
    this.nombre = date.Nombre;
    this.municipio = date.Municipio;
    this.comunidad = date.Comunidad;
    this.calle = date.calle;
    this.numero = date.Numero;
    this.tel = date.tel;
    this.rangeDates = date.rangeDates;
    this.dias = Number(date.dias);
    const diaA = new Date(date.rangeDates);
    diaA.setDate(diaA.getDate() - 1);
    this.dateEvent = diaA;
    const diaD = new Date(date.rangeDates);
    diaD.setDate(diaD.getDate() + 1);
    this.dateDeliver = diaD;
  }

  initConfig() {
    
    this.payPalConfig = {
      currency: 'MXN',
      clientId:
        'AZc9ELb_wCswN4YHPXgb8RQZg25npnaEZkoWa07F-2BlRicxhS9J4FFcHZwS6ywKL5xrJPUXnEuOYNsB',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'MXN',
                value: this.totalPrecio.toString(), //TOTAAAAL
                breakdown: {
                  item_total: {
                    currency_code: 'MXN',
                    value: this.totalPrecio.toString(), //TOTAAAAL
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        // console.log(
        //   'onApprove - transaction was approved, but not authorized',
        //   data,
        //   actions
        // );
        
        actions.order.get().then((details: any) => {
          this.e_mail = localStorage.getItem('e_mail') + '';
          this.user = localStorage.getItem('user') + '';
          if (details) {
            const data: Order = {
              status: 'En proseso',
              fullNameUser: this.nombre,
              paid: true,
              municipio: this.municipio,
              comunidad: this.comunidad,
              numero: this.numero,
              email: this.e_mail,
              telefono: this.tel,
              dateDeliver: this.dateDeliver,
              dateReturn: this.rangeDates,
              Products: this.cargaProduct,
              idUser: this.user,
              days: this.dias,
              totalPrecio: this.totalPrecio,
              calle: this.calle,
              dateEvent: this.dateEvent,
            };
            this.mensajesService.showConfirm();
            this.orderService.postOrder(data).subscribe((mesaje: any) => {
              const l = '' + localStorage.getItem('idCart');
              this.deleteCartProductsService
                .deleteCart(l)
                .subscribe((mensaje: any) => {});
              
            });
          }
          // console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        // console.log(
        //   'onClientAuthorization - you should probably inform your server about completed transaction at this point',
        //   JSON.stringify(data)
        // );
        // this.openModal(
        //   data.purchase_units[0].items,
        //   data.purchase_units[0].amount.value
        // );
        // this.emptyCart();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err: any) => {
        console.log('OnError', err);
        
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
    return this.payPalConfig;
  }
}
