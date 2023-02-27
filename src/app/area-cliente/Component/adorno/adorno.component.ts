
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Type } from 'src/app/models/product/product.module';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { DetalleService } from 'src/app/services/Detalles/detalle.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adorno',
  template: `
    <div class="lgd">
      <div class="container-fluid pt-5 pb-3 ">
        <h2
          class="section-title position-relative text-uppercase mx-xl-5 mb-4"
          style="color:white;"
        >
          <span class="pr-3">Adornos</span>
        </h2>
        <div class="row px-xl-5">
          <div
            *ngFor="let adorno of adornos"
            class="col-lg-3 col-md-4 col-sm-6 pb-1"
          >
            <div
              class="product-item bg-light mb-4"
              (click)="detalles('' + adorno._id)"
            >
              <div class="product-img position-relative overflow-hidden">
                <img [src]="url+adorno.imagePath" class="img-fluid w-100" alt="" />
                <div class="product-action">
                  <a class="btn btn-outline-dark" style="border-radius: 10px;"
                    >Ver Detalles&nbsp;&nbsp;&nbsp;<i class="fa fa-search"></i
                  ></a>
                </div>
                <div class="text-center py-4">
                  <a class="h6 text-decoration-none text-truncate">{{
                    adorno
                  }}</a>
                  <div
                    class="d-flex align-items-center justify-content-center mt-2"
                  >
                    <h5>{{ adorno }}</h5>
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
  `,
  styleUrls: ['./adorno.component.css'],
})
export class AdornoComponent implements OnInit {
  adornos: Product[] = [];
  url = environment.urlImagen;
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private detalleService:DetalleService
  ) {
    this.breadcrumbService.setBreadcrumb('Adornos','adornos');
  }

  ngOnInit(): void {
    this.getProductsType('adorno');
    
  }
  getProductsType(typ: string) {
    const type: Type = {
      Type: typ,
    };

  }
  detalles(id: string) {
    this.detalleService.emit(id)
    localStorage.setItem('idProduct', id);
    this.router.navigateByUrl('/details');
  }
}
