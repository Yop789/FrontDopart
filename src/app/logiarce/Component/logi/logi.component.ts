import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css'],
})
export class LogiComponent implements OnInit {
  secretKey = environment.secretKey;
  email = '';
  password = '';
  constructor(
    private router:Router,
    private iniciarSesionService: IniciarSesionService,
    private snackBar: MatSnackBar,
    private snackDialogRer: MatDialogRef<LogiComponent>
    ) {}

  ngOnInit(): void {
  }
  log_in() {
    const p = this.encriptar(this.password);
    this.iniciarSesionService.login(this.email, p).subscribe((res: any) => {
      if (res.message === 'session started correctly') {
        if (res.doc[0].Customer === true) {
          this.iniciarSesionService.emit(false,true,true)
          localStorage.setItem('IdClient',res.doc[0]._id)
          this.cerrarDialog()
          let routeName = this.router.url;
          if(routeName==="/registrarce"){
            this.router.navigateByUrl("/home")
          }
          console.log(routeName)
        }else this.alert(res.message)
      }else this.alert(res.message)
    });
  }
  encriptar(value: string) {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  btnQUC(){
    this.router.navigateByUrl('/registrarce')
  }
  cerrarDialog(){
    this.snackDialogRer.close()
  }
}
