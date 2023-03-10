import { Router } from '@angular/router';
import { IniciarSesionService } from './../services/Login/iniciar-sesion.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InactivityService } from '../services/Inactividad/inactivity-service.service';

@Component({
  selector: 'app-area-admin',
  templateUrl: './area-admin.component.html',
  styleUrls: ['./area-admin.component.css']
})
export class AreaAdminComponent implements OnInit, OnDestroy {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
    
  }

  ngOnDestroy() {
   
  }

}
