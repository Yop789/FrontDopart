import { DeleteCartProductsService } from './../cars-services/deleteCartProducts.service';
import { UpdateCartProductsService } from './../cars-services/updateCartProducts.service';
import { OrderProduct } from './../../models/order/order.module';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/models/cart/cart.module';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  private user = '' + localStorage.getItem('idClient');
  private events = {
    list:<OrderProduct[]>[],
    add(event:OrderProduct) {
      this.list.push(event);
    },
    update(index:number, event:OrderProduct) {
      this.list[index] = event;
    },
    delete(index:number) {
      this.list.splice(index, 1);
    }
  };

  private eventsSubject = new BehaviorSubject(this.events);
  events$ = this.eventsSubject.asObservable();


  constructor(private snackBar: MatSnackBar, private updateCartProductsService:UpdateCartProductsService, private deleteCartProductsService:DeleteCartProductsService) { }


  addEvent(event:OrderProduct) {
    var elementIndex = this.events.list.findIndex(
      (obj) => obj.IdProducts == event.IdProducts
    );
    if (elementIndex > -1) {
      this.updateEvent(elementIndex,event)
    } else {
      this.events.add(event);
    this.eventsSubject.next(this.events);
      this.alert('Se agrego correctamente');
    }    
    
  }
  updateEvent(index:number,event:OrderProduct) {
    this.events.update(index, event);
    this.eventsSubject.next(this.events);
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  eliminarProduct(Id: string) {
    const l = '' + localStorage.getItem('idCart');
    let elementIndex = 0;
    if (this.events.list.length > 0) {
      this.events.list.forEach(element => {
        if (element.IdProducts===Id){
          this.events.delete(elementIndex);
        }
        elementIndex++
      }
      );
      
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.events.list
      };
      this.updateCartProductsService
        .ubdateCart(l, cart)
        .subscribe((mensaje: any) => {});
      
    } else {
      console.log(this.events.list)
      this.deleteCartProductsService
        .deleteCart(l)
        .subscribe((mensaje: any) => {});
    }
  }
}
