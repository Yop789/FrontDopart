import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { User } from '../models/user/user.module';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  url = environment.urlApi+'Users';

  constructor(private http: HttpClient) {}
  

  postNewUsuari(user: User): Observable<User> {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.post<User>(this.url, user,{headers: header});
  }
}
