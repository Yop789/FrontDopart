import { ControllerService } from 'src/app/services/cart/controller.service';
import { email } from './../../models/user/user.module';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user/user.module';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {
  url1= `${environment.urlApi}autentic`
  private subject = new Subject<any>();

  emit(cliente: boolean,admin:boolean,sinSesion:boolean) {
    this.subject.next({ cliente:cliente,admin:admin,sinSesion:sinSesion});
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient,
    private cartControllers:ControllerService
    ) { }

  login(email:string,password:string){
    const user:email={
      E_mail: email,
      Password: password
    }
      let header = new HttpHeaders().set('Type-content', 'aplication/json');
      let l= this.http.post<User>(this.url1,user,{headers:header}); 
      l.subscribe((date:any)=>{
        let _id=date.doc[0]._id
        console.log(_id)
        this.cartControllers.setId(_id)
      })
      return l  
  }
}
