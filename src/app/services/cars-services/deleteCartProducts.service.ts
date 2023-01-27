import { environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart} from '../../models/cart/cart.module';

@Injectable({
  providedIn: 'root'
})
export class DeleteCartProductsService {
  url3 = `${environment.urlApi}Cart/`
  
  constructor(private http: HttpClient) { }
  deleteCart(id: string): Observable<Cart> {
    return this.http.delete<Cart>(this.url3 + id)
  }
}
