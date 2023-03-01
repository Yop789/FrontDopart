import { ArticulosService } from './../Articulos/articulos.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from 'src/app/models/product/product.module';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private subject = new Subject<any>();

  constructor(
    private productsService:ArticulosService
  ){}

  emit(event: string) {
    this.productsService
      .getArticulo('' + event).subscribe((products: HttpResponse<any>) => {
        const cp =products.body
        this.subject.next({cp});
      });
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
}
