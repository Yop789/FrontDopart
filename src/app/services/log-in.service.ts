import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user/user.module';
@Injectable({
  providedIn: 'root',
})
export class LogInService {
  url = `${environment.urlApi}Users`;
  
  constructor(private http: HttpClient) {}
  getUser() {
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    return this.http.get<User>(this.url, { headers: header });
  }
}
