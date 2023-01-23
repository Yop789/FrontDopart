import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart} from '../models/cart/cart.module';
@Injectable({
  providedIn: 'root'
})
export class SetCartProductsService {
  url= `${environment.urlApi}Carts`
  constructor(private http: HttpClient) { }

  postCart(cart:Cart): Observable<Cart>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Cart>(this.url,cart,{headers:header});
  }
}
