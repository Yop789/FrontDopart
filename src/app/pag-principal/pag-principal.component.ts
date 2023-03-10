import { InactivityService } from './../services/Inactividad/inactivity-service.service';
import { BreadcrumbService } from './../services/breadcrumb.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag-principal',
  templateUrl: './pag-principal.component.html',
  styleUrls: ['./pag-principal.component.css'],
})
@HostListener('document:mousemove')
  @HostListener('document:keypress')
  
export class PagPrincipalComponent implements OnInit {
  
  constructor(
    private BreadcrumbService: BreadcrumbService,
    private inactivityService: InactivityService
  ) {
    this.BreadcrumbService.vaciarBreadcrumb();
    this.BreadcrumbService.setBreadcrumb('Principal', 'principal');
    this.inactivityService.isIdle().subscribe((isIdle) => {
      if (isIdle) {
        console.log('El usuario está inactivo');
      } else {
        console.log('El usuario está activo');
        // El usuario está activo
      }
    });
  }
  
  ngOnInit(): void {}
  userActivity() {
    this.inactivityService.userActivity();
  }
}
