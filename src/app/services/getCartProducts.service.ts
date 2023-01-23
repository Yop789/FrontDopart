import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart,CartCostmer } from '../models/cart/cart.module';

@Injectable({
  providedIn: 'root'
})
export class GetCartProductsService {
  url= `${environment.urlApi}Carts`
  url2= `${environment.urlApi}CartCostume`
  
  constructor(private http: HttpClient) { }

  getCart(cartCostmer: CartCostmer): Observable<Cart>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Cart>(this.url2,cartCostmer,{headers:header});
  }
}
