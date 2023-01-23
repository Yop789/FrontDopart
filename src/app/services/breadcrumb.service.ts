import { BreadcrumbModule } from './../models/breadcrumb/breadcrumb.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbModule: BreadcrumbModule[] = [];

  constructor() {}
  

  setBreadcrumb(ob: BreadcrumbModule) {
    var num = this.breadcrumbModule.findIndex((obj) => obj.nombre == ob.nombre);
    if (num == -1) {
      this.breadcrumbModule.push(ob);
    }
    this.deletBBreadcrumb(ob);
  }
  deletBBreadcrumb(ob: BreadcrumbModule) {
    var n = 1;
    var al = this.breadcrumbModule.length;
    this.breadcrumbModule.forEach((element) => {
      if (element.nombre == ob.nombre) {
        this.breadcrumbModule.splice(n, al);
      }
      n++;
    });
  }
  getBreadcrumb() {
    return this.breadcrumbModule;
  }
}
