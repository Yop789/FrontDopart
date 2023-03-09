import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CodigoPostal } from '../models/codigo-postal/codigo-postal.module';

@Injectable({
  providedIn: 'root',
})
export class CodigoPostalService {
  url1 = `${environment.urlApi}/cPostal`
  constructor(private http: HttpClient) {}

  getPostal(l:string): Observable<HttpResponse<CodigoPostal>>  {
    var codP = {
      cp:l
    }
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<CodigoPostal>(this.url1,codP,{ observe: 'response', headers: header });
  }
}
