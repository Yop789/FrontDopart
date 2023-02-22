import { IniciarSesionService } from './../Login/iniciar-sesion.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class UserGuard implements CanActivate {

    constructor(private iniciarSesionService:IniciarSesionService, private router: Router) {}
  
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
        if (this.iniciarSesionService.user()) {
          return true; // El usuario es un administrador, permitir acceso a la ruta
        } else {
            return false // El usuario no es un administrador, redirigir a la página de no autorizado
        }
    }
  }