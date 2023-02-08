import { DetalleService } from './../../../services/Detalles/detalle.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Product, Type } from 'src/app/models/product/product.module';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, DoCheck {
  secretKey = 'YourSecretKeyForEncryption&Descryption';
  url = environment.urlImagen;;
  
  silla: Product[] = [];
  sillaRandom: Product[] = [];
  sillas: Product[] = [];
  _mesa: Product[] = [];
  mesaRandom: Product[] = [];
  mesas: Product[] = [];
  adorno: Product[] = [];
  adornoRandom: Product[] = [];
  adornos: Product[] = [];
  
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private detalleService:DetalleService
    
  ) {}

  ngOnInit() {
    this.getsillasHome('silla');
    this.getsillasHome('mesa');
    this.getsillasHome('adorno');
    this.breadcrumbService.setBreadcrumb('Home','home');
    
  }
  ngDoCheck() {
    
  }
  getsillasHome(typ: string) {
    const type: Type = {
      Type: typ,
    };
    this.productsService.getProductsN(type).subscribe((products: any) => {
      for (let i = 0; i < products.length; i++) {
        const l = products[i];
        const pro: Product = l;
        switch (typ) {
          case 'silla': {
            this.silla[i] = pro;
            break;
          }
          case 'mesa': {
            this._mesa[i] = pro;
            break;
          }
          case 'adorno': {
            this.adorno[i] = pro;
            break;
          }
          default: {
            //statements;
            break;
          }
        }
      }
      const r = Math.floor(Math.random() * 4);
      switch (typ) {
        case 'silla': {
          this.sillaRandom[0] = this.silla[r];
          break;
        }
        case 'mesa': {
          this.mesaRandom[0] = this._mesa[r];
          break;
        }
        case 'adorno': {
          this.adornoRandom[0] = this.adorno[r];
          break;
        }
        default: {
          //statements;
          break;
        }
      }
    });
  }
  getProductsType(typ: string) {
    const type: Type = {
      Type: typ,
    };
    this.productsService.getProducts(type).subscribe((prod: any) => {
      for (let i = 0; i < prod.length; i++) {
        const l = prod[i];
        const pro: Product = l;
        switch (typ) {
          case 'silla': {
            this.sillas[i] = pro;
            break;
          }
          case 'mesa': {
            this.mesas[i] = pro;
            break;
          }
          case 'adorno': {
            this.adornos[i] = pro;
            break;
          }
          default: {
            //statements;
            break;
          }
        }
      }
    });
  }
  detalles(id: string){
    this.detalleService.emit(id)
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details')
  }
}
