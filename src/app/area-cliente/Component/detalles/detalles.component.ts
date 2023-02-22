import { DetalleService } from 'src/app/services/Detalles/detalle.service';
import { MatDialog } from '@angular/material/dialog';
import { ControllerService } from './../../../services/cart/controller.service';

import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.module';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { LogiComponent } from 'src/app/logiarce/Component/logi/logi.component';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
})

export class DetallesComponent implements OnInit, DoCheck {
  cantidad = 0;
  url = environment.urlImagen;
  product!: Product;
  value: any;
  total = 0;
  idProduct =  localStorage.getItem('idProduct');
  tr = this.idProduct;
  constructor(
    private snackBar: MatSnackBar,
    private processPaymentService: ControllerService,
    private breadcrumbService: BreadcrumbService,
    private detalleService:DetalleService,
    private dialog:MatDialog
  ) {
    this.detalleService.listen().subscribe((date:any)=>{
      this.product=date.products.product
    })
  }
  ngDoCheck(): void {
    
  }

  ngOnInit() {
    
    this.breadcrumbService.setBreadcrumb('Detalles del producto','details');
  }
  // mas() {
  //   this.cantidad = Number(this.cantidad) + 1;
  //   this.total = Number(this.cantidad) * this.product.Price;
  // }
  // menos() {
  //   if (this.cantidad >= 1) {
  //     this.cantidad = Number(this.cantidad) - 1;
  //     this.total = Number(this.cantidad) * this.product.Price;
  //   }
  // }

  // resume() {
  //   this.total = Number(this.cantidad) * this.product.Price;
  // }

  // agregarCart() {
  //   const id = localStorage.getItem('IdClient')
  //   if(id!=''){
  //   if (this.cantidad >= 1) {
  //     const pr = this.product;
  //     const cart: OrderProduct = {
  //       IdProducts: '' + this.idProduct,
  //       Amount: this.cantidad,
  //       Name: pr.Name,
  //       Description: pr.Description,
  //       Total: this.total,
  //       UrlImage: pr.imagePath,
  //     };
  //     this.processPaymentService.addEvent(cart);
  //     if (this.product.TotalStock < Number(this.cantidad)) {
  //       this.alert('solo se le pueden ofrecer ' + this.product.TotalStock);
  //       this.cantidad = Number(this.product.TotalStock);
  //     }
  //   } else
  //     this.alert(
  //       'No se puede agregar al camioncito si no son mas de una pieza'
  //     );
  //   }else this.btnIniciarSesion()
  // }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  btnIniciarSesion(){
    this.dialog.open(LogiComponent, {
      panelClass: 'custom'
    })
  }
}
