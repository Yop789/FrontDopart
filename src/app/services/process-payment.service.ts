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
    private controllerService: ControllerService
  ) {}
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
              Status: 'En proseso',
              FullNameUser: this.nombre,
              Paid: true,
              Municipio: this.municipio,
              Comunidad: this.comunidad,
              Numero: this.numero,
              Email: this.e_mail,
              Telefone: this.tel,
              DateDeliver: this.dateDeliver,
              DateReturn: this.rangeDates,
              Products: this.cargaProduct,
              IdCustomer: this.user,
              Dias: this.dias,
              TotalPrecio: this.totalPrecio,
              Calle: this.calle,
              DateEvent: this.dateEvent,
            };
            this.mensajesService.showConfirm();
            this.orderService.postOrder(data).subscribe((mesaje: any) => {
              const l = '' + localStorage.getItem('idCart');
              this.deleteCartProductsService
                .deleteCart(l)
                .subscribe((mensaje: any) => {});
              this.cargaAnterior();
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
  totalProduct() {
    let cantidadProductos=0
    this.controllerService.listen().subscribe((date: any) => {
      cantidadProductos = date.items;
    });
    return cantidadProductos
  }
  verCargaProduct() {
    return this.cargaProduct;
  }
  setPrecio(precio: number) {
    this.totalPrecio = precio;
  }
  verPrecioTotal() {
    this.totalPrecio = 0;
    this.cargaProduct.forEach((mst) => {
      const p = mst.Total;
      this.totalPrecio += p;
    });
    return this.totalPrecio;
  }
  // Recarga el carrito para mostrarselo al usuario
  cargaAnterior() {
    this.cargaProduct = [];
    const l: CartCostmer = {
      IdCustomer: this.user,
    };
    this.getCartProductsService.getCart(l).subscribe((cart: any) => {
      if (cart[0] != undefined) {
        localStorage.setItem('idCart', cart[0]._id);
        const products = cart[0].Products;
        products.forEach((product: any) => {
          this.cargaProduct.push(product);
        });
      } else {
        localStorage.setItem('idCart', '');
      }
    });
  }
}
