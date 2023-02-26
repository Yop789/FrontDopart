import {emailCodigo, User } from './../../models/user/user.module';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearCodigoService {
  private correo=''
  private url1=`${environment.urlApi}/codigo`
  private url2=`${environment.urlApi}/cambiarC`
  private url3=`${environment.urlApi}/copContras`
  constructor(private http: HttpClient) { }


  post(em:string): Observable<HttpResponse<any>>{
    this.correo=em
    const e:emailCodigo={
      correoElectronico: em
    }
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<User>(this.url1,e, { observe: 'response', headers: headers });
  }

  ubdateContraseña(pas:string,cod:string): Observable<HttpResponse<any>>{
    const e:emailCodigo={
      correoElectronico: this.correo,
      codigo:cod,
      password:pas
    }
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.put<User>(this.url2,e, { observe: 'response', headers: headers });
  }
  comparCodigo(cod:string): Observable<HttpResponse<any>>{
    const e:emailCodigo={
      correoElectronico: this.correo,
      codigo:cod,
    }
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<User>(this.url3,e, { observe: 'response', headers: headers });
  }
}
