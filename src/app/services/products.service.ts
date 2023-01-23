/**
 * @description Este serbicio se establese para realisar la peticion al servidor de los productos, contando con tres metodos
 * 
 */

import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product,Type } from '../models/product/product.module';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = `${environment.urlApi}Product/type`;
  url2 = `${environment.urlApi}Prod/type`;
  url3 = `${environment.urlApi}Product/`
  constructor(private http: HttpClient) {}

  getProductsN(type:Type): Observable<Type>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Type>(this.url,type,{headers: header});
  }
  getProducts(type:Type): Observable<Type>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<Type>(this.url2,type,{headers: header});
  }
  getProductId(id: string):Observable<Product>{
    return this.http.get<Product>(this.url3 + id);
  }

}
