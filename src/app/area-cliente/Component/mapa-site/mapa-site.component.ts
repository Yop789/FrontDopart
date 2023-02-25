import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa-site',
  templateUrl: './mapa-site.component.html',
  styleUrls: ['./mapa-site.component.css']
})
export class MapaSiteComponent implements OnInit {
  private router: Router | any
  constructor(private breadcrumbService:BreadcrumbService) { 
    this.breadcrumbService.setBreadcrumb('Mapa dofest','Mapa')
  }

  ngOnInit(): void {
  }
  home(){
    this.router.navigateByUrl("/home")
    
  }
}
