import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart} from '../models/cart/cart.module';


@Injectable({
  providedIn: 'root'
})
export class UpdateCartProductsService {

  url3 = `${environment.urlApi}Cart/`
  constructor(private http: HttpClient) { }

  ubdateCart(id: string, cart:Cart): Observable<Cart> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.put<Cart>(this.url3 + id, cart,{headers: header})
  }
}
