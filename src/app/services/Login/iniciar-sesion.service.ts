import { Router } from '@angular/router';
import { Type } from './../../models/product/product.module';
import { ControllerService } from 'src/app/services/cart/controller.service';
import { email } from './../../models/user/user.module';
import { environment } from './../../../environments/environment';
import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/user/user.module';
import { Observable, Subject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class IniciarSesionService {
  url1 = `${environment.urlApi}//signin`;
  private subject = new Subject<any>();

  emit(cliente: boolean, admin: boolean, sinSesion: boolean) {
    this.subject.next({ cliente: cliente, admin: admin, sinSesion: sinSesion });
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private cartControllers: ControllerService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const or = true;
    const user: email = {
      email: email,
      password: password,
    };
    let header = new HttpHeaders().set('Type-content', 'aplication/json');
    let l = this.http.post<User>(this.url1, user, {
      observe: 'response',
      headers: header,
    });
    l.subscribe((response: HttpResponse<any>) => {
      console.log(response);
      const token = response.body.token;
      const decodedToken: any = jwt_decode.default(token);
      if (decodedToken.roles[0] == 'user') {
        localStorage.setItem('token', `${token}`);
        this.router.navigateByUrl('/home');
        this.emit(false, true, true);
      } else {
        this.emit(true, false, true);
        this.router.navigateByUrl('/admin');
        localStorage.setItem('token', `${token}`);
      }
    });
    return l;
  }
  admin(): boolean {
    const token = `${localStorage.getItem('token')}`;
    if (token == '' || token == null) {
      this.router.navigateByUrl('/principal');
      this.emit(true, true, false);
      return false
    } else {
      const decodedToken: any = jwt_decode.default(token);
      if (decodedToken.roles[0] != 'user') {
        this.emit(true, false, true);
        return true;
      }
      return false
    }
  }
  user(): boolean {
    const token = `${localStorage.getItem('token')}`;
    if (token == '' || token == null) {
      this.router.navigateByUrl('/principal');
      this.emit(true, true, false);
      return false
    } else {
      const decodedToken: any = jwt_decode.default(token);
      if (decodedToken.roles[0] == 'user') {
        this.emit(false, true, true);
        return true;
      }else return false 
    }
  }
}
