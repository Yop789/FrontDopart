import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product.module';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  url1= environment.urlApi+"/products"

  constructor(private http: HttpClient) { }


  getProducts():  Observable<HttpResponse<Product>>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<Product>(this.url1,{
      observe: 'response',
      headers: header,
    });
  }
  postNewArticulo(producto: any): Observable<HttpResponse<Product>> {
    console.log(producto)
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', `${token}`);
    return this.http.post<Product>(this.url1, producto, { observe: 'response', headers: headers });
  }
  
}
