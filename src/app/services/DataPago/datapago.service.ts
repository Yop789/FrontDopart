import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.module';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class DatapagoService {
  nombre = '';
  municipio = '';
  comunidad = '';
  calle = '';
  numero = '';
  codigo = '';
  email = '';
  tel = '';
  fecha:Date = new Date()
  url = `${environment.urlApi}/user/`;

  constructor(private http: HttpClient) {}

  get(): Observable<HttpResponse<User>> {
    const token = '' + localStorage.getItem('token');
    const decodedToken: any = jwt_decode.default(token);
    const id = decodedToken.id;
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')
      .set('x-access-token', `${token}`);
    return this.http.get<User>(this.url + id, {
      observe: 'response',
      headers: header,
    });
  }

  agregarPaso1(
    nombre: string,
    codigo: string,
    municipio: string,
    comunidad: string,
    calle: string,
    numero: string
  ) {
    this.nombre = nombre;
    this.codigo = codigo;
    this.municipio = municipio;
    this.comunidad = comunidad;
    this.calle = calle;
    this.numero = numero;
    // console.log(this.nombre+' '+this.codigo+' '+this.municipio+' '+this. comunidad +' '+this.calle+'  '+this.numero )
  }
  agregarPaso2(email: string, tel: string,fecha:Date) {
    this.email = email;
    this.tel = tel;
    this.fecha = fecha
  }
  getDataPaso1() {
    return this.get();
  }
  getDatasclient() {
    
    return {
      nombre: this.nombre,
      municipio: this.municipio,
      comunidad: this.comunidad,
      calle: this.calle,
      numero: this.numero,
      email: this.email,
      tel: this.tel,
      fecha:this.fecha
    };
  }
}
