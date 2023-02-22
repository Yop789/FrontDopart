import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../../models/user/user.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  url = `${environment.urlApi}/signup`;

  constructor(private http: HttpClient) {}
  

  postNewUsuari(user: User): Observable<HttpResponse<User>> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<User>(this.url, user,{ observe: 'response', headers: header });
  }
}
