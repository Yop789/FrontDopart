import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order/order.module';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = `${environment.urlApi}/order`;

  constructor(private http: HttpClient) {}

  postOrder(order: Order): Observable<HttpResponse<Order>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      .set('x-access-token', `${token}`);
    return this.http.post<Order>(this.url, order, { observe: 'response', headers: headers });
  }
}
