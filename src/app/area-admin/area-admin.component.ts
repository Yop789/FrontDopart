import { Router } from '@angular/router';
import { IniciarSesionService } from './../services/Login/iniciar-sesion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-admin',
  templateUrl: './area-admin.component.html',
  styleUrls: ['./area-admin.component.css']
})
export class AreaAdminComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit(): void {
    
    
  }

}
