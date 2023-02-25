import { Product } from './../../models/product/product.module';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private url1= `${environment.urlApi}/products`
  private url2= `${environment.urlApi}/product/`
  private DataArt:any 
  constructor(private http: HttpClient) { }

  

  getProducts():  Observable<HttpResponse<Product>>{
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<Product>(this.url1,{
      observe: 'response',
      headers: header,
    });
  }
  postNewArticulo(articulo: any): Observable<HttpResponse<Product>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', `${token}`);
    return this.http.post<Product>(this.url1, articulo, { observe: 'response', headers: headers });
  }

  deleteArticulo(id:string): Observable<HttpResponse<Product>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', `${token}`);
    return this.http.delete<Product>(this.url2+id, { observe: 'response', headers: headers });
  }

  getArticulo(id:string): Observable<HttpResponse<Product>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', `${token}`);
    const data= this.http.get<Product>(this.url2+id, { observe: 'response', headers: headers });
    data.subscribe((response:HttpResponse<any>)=>{
      if(response.statusText=="OK"){
        this.DataArt=response.body
      }
    })
    return data
  } 
  getDataArt(){
    return this.DataArt
  }
  eliminarDataEr(){
    this.DataArt=null
  }
  updateArticulos(id:string,artculo:Product): Observable<HttpResponse<Product>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', `${token}`);
    return this.http.put<Product>(this.url2+id,artculo, { observe: 'response', headers: headers });
  }
}
