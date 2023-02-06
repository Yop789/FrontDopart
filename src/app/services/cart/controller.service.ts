import { CartCostmer } from './../../models/cart/cart.module';
import { GetCartProductsService } from './../cars-services/getCartProducts.service';
import { SetCartProductsService } from './../cars-services/setCartProducts.service';
import { DeleteCartProductsService } from './../cars-services/deleteCartProducts.service';
import { UpdateCartProductsService } from './../cars-services/updateCartProducts.service';
import { OrderProduct } from './../../models/order/order.module';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart/cart.module';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  private user = '' + localStorage.getItem('idClient');
  private subject = new Subject<any>();
  private costoOrder = new Subject<any>();
  private idCostumer = '';

  private events = {
    list: <OrderProduct[]>[],
    add(event: OrderProduct) {
      this.list.push(event);
    },
    update(index: number, event: OrderProduct) {
      this.list[index] = event;
    },
    delete(index: number) {
      this.list.splice(index, 1);
    },
    cargarAnt(event: OrderProduct[]) {
      this.list = event;
    },
  };
  private eventsSubject = new BehaviorSubject(this.events);
  events$ = this.eventsSubject.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private updateCartProductsService: UpdateCartProductsService,
    private deleteCartProductsService: DeleteCartProductsService,
    private setCartProductsService: SetCartProductsService,
    private getCartProductsService: GetCartProductsService
  ) {}

  addEvent(event: OrderProduct) {
    var elementIndex = this.events.list.findIndex(
      (obj) => obj.IdProducts == event.IdProducts
    );
    if (elementIndex > -1) {
      this.updateEvent(elementIndex, event);
    } else {
      this.events.add(event);
      this.eventsSubject.next(this.events);
      this.alert('Se agrego correctamente');
    }
    this.emit();
  }

  eliminarProduct(Id: string) {
    const l = '' + localStorage.getItem('idCart');
    let elementIndex = 0;
    if (this.events.list.length > 0) {
      this.events.list.forEach((element) => {
        if (element.IdProducts === Id) {
          this.events.delete(elementIndex);
        }
        elementIndex++;
      });
    }
    this.eventosCart();
  }

  cargarAnterior() {
    const idCostumer: CartCostmer = {
      IdCustomer: this.idCostumer,
    };
    this.getCartProductsService.getCart(idCostumer).subscribe((date: any) => {
      if (date.length > 0) {
        this.events.cargarAnt(date[0].Products);
        this.eventosCart();
      } else {
        const j: OrderProduct[] = [];
        this.events.cargarAnt(j);
      }
    });
  }
  setCarController() {
    const cart: Cart = {
      IdCustomer: this.idCostumer,
      Products: this.events.list,
    };
    if (this.events.list.length > 0) {
      const idCostumer: CartCostmer = {
        IdCustomer: this.idCostumer,
      };
      this.getCartProductsService.getCart(idCostumer).subscribe((date: any) => {
        console.log(date);
        if (date.length > 0) {
          this.updateCartProductsService
            .ubdateCart(this.idCostumer, cart)
            .subscribe((mensaje: any) => {});
        } else {
          this.setCartProductsService.postCart(cart).subscribe((date) => {});
        }
      });
    } else {
      console.log(this.events.list);
      this.deleteCartProductsService
        .deleteCart(this.idCostumer)
        .subscribe((mensaje: any) => {});
    }
  }

  eventosCart() {
    this.precio();
    this.emit();
  }

  precio() {
    let sumaCostos = 0;
    let cantidadItem = 0;
    for (const producto of this.events.list) {
      sumaCostos += producto.Total;
      cantidadItem += producto.Amount;
    }
    this.costoOrder.next({ sumaCostos, cantidadItem });
  }

  updateEvent(index: number, event: OrderProduct) {
    this.events.update(index, event);
    this.eventsSubject.next(this.events);
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  getCostOrder(): Observable<any> {
    return this.costoOrder.asObservable();
  }

  emit() {
    let items = this.events.list.length;
    this.subject.next({ items });
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
  setId(id: string) {
    this.idCostumer = id;
  }
  vaciar() {
    const j: OrderProduct[] = [];
    this.events.cargarAnt(j);
    this.emit();
    this.precio();
  }
}
