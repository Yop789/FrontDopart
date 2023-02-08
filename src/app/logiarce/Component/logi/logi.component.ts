import { ControllerService } from 'src/app/services/cart/controller.service';
import { RecupeContraComponent } from './../recupe-contra/recupe-contra.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

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
    private snackDialogRer: MatDialogRef<LogiComponent>,
    private dialog: MatDialog,
    private ControllerService:ControllerService
    ) {}

  ngOnInit(): void {
  }
  log_in() {
    const p = this.encriptar(this.password);
    let lS =`${localStorage.getItem('userId')}`
    let dese=`${this.desemcriptar(lS)}`
    const deseciptad= JSON.parse(dese)
    if(deseciptad?.Admi ){
      this.iniciarSesionService.emit(true,false,true)
    }else{
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
          let usu=JSON.stringify(res)
          localStorage.setItem('userId', this.encriptar(usu))
          this.ControllerService.cargarAnterior()
        }else this.alert(res.message)
      }else this.alert(res.message)
    });
    }
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
    this.cerrarDialog()
  }
  cerrarDialog(){
    this.snackDialogRer.close()
  }
  recuperar(){
    this.dialog.open(RecupeContraComponent,{
        enterAnimationDuration:'700ms',
        exitAnimationDuration:'700ms'
      })
    this.cerrarDialog()
  }
  desemcriptar(t: string) {
    if (t) {
      return CryptoJS.AES.decrypt(t, this.secretKey.trim()).toString(
        CryptoJS.enc.Utf8
      );
    } else return "no hay datos"
  }
  
}
