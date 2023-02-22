// import { ProductsService } from 'src/app/services/products.service';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  private subject = new Subject<any>();

  constructor(
    // private productsService:ProductsService
  ){}

  emit(event: string) {
    // this.productsService
    //   .getProductId('' + event).subscribe((products: any) => {
    //     this.subject.next({products});
    //   });
  }

  listen(): Observable<any> {
    return this.subject.asObservable();
  }
}
