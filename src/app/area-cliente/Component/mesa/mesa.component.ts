import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Type } from 'src/app/models/product/product.module';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { DetalleService } from 'src/app/services/Detalles/detalle.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mesa',
  template: `
    <!-- <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body style="background-color: rgb(0, 0, 0,.6)">
        <div class="lgd">
          <div class="container-fluid pt-5 pb-3 ">
            <h2
              class="section-title position-relative text-uppercase mx-xl-5 mb-4"
              style="color:white;"
            >
              <span class="pr-3">Mesas</span>
            </h2>
            <div class="row px-xl-5">
              <div
                *ngFor="let mesa of mesas"
                class="col-lg-3 col-md-4 col-sm-6 pb-1"
              >
                <div
                  class="product-item bg-light mb-4"
                  (click)="detalles('' + mesa._id)"
                >
                  <div class="product-img position-relative overflow-hidden">
                    <img
                      [src]="mesa.imagePath"
                      class="img-fluid w-100"
                      alt=""
                    />
                    <div class="product-action">
                      <a
                        class="btn btn-outline-dark"
                        style="border-radius: 10px;"
                        >Ver Detalles&nbsp;&nbsp;&nbsp;<i
                          class="fa fa-search"
                        ></i
                      ></a>
                    </div>
                    <div class="text-center py-4">
                      <a class="h6 text-decoration-none text-truncate">{{
                        mesa.Name
                      }}</a>
                      <div
                        class="d-flex align-items-center justify-content-center mt-2"
                      >
                        <h5>{{ mesa.Description }}</h5>
                        <h6 class="text-muted ml-2"><del></del></h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-fluid pb-3 "></div>
      </body>
    </html> -->
  `,
  styleUrls: ['./mesa.component.css'],
})
export class MesaComponent implements OnInit {
  mesas: Product[] = [];
  url = environment.urlImagen;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private detalleService: DetalleService
  ) {
    this.breadcrumbService.setBreadcrumb('Mesas', 'mesas');
  }

  ngOnInit(): void {
    // this.getProductsType('mesa');
    
  }
  // getProductsType(typ: string) {
  //   const type: Type = {
  //     Type: typ,
  //   };
  //   this.productsService.getProducts(type).subscribe((prod: any) => {
  //     for (let i = 0; i < prod.length; i++) {
  //       const l = prod[i];
  //       const pro: Product = {
  //         _id: l._id,
  //         Name: l.Name,
  //         Description: l.Description,
  //         TotalProduct: l.TotalProduct,
  //         TotalStock: l.TotalStock,
  //         TotalService: l.TotalService,
  //         Type: l.Type,
  //         Price: l.Price,
  //         imagePath: this.url + l.imagePath,
  //       };
  //       this.mesas[i] = pro;
  //     }
  //   });
  // }
  detalles(id: string) {
    this.detalleService.emit(id);
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details');
  }
}
