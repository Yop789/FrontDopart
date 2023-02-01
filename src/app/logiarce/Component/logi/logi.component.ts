import { BreadcrumbService } from './../../../services/breadcrumb.service';
import { CartCostmer } from './../../../models/cart/cart.module';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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
    private router: Router,
    private iniciarSesionService: IniciarSesionService,
    private breadcrumbService:BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.setBreadcrumb('IniciarSesion','iniciarSesion');
  }
  log_in() {
    const p = this.encriptar(this.password);
    this.iniciarSesionService.login(this.email, p).subscribe((resl: any) => {
      if (resl.message === 'session started correctly') {
        if (resl.doc[0].Customer === true) {
          this.iniciarSesionService.emit(false,true,true)
          this.router.navigateByUrl('/home');
          localStorage.setItem('IdClient',resl.doc[0]._id)
        }
      }
    });
  }
  encriptar(value: string) {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
}
