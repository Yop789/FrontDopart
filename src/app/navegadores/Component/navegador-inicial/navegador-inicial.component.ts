import { LogiComponent } from './../../../logiarce/Component/logi/logi.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navegador-inicial',
  templateUrl: './navegador-inicial.component.html',
  styleUrls: ['./navegador-inicial.component.css']
})
export class NavegadorInicialComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  mostrarMenu(pagina:string) {
    this.router.navigateByUrl(`/${pagina}`);
  }
  btnIniciarSesion(){
    this.dialog.open(LogiComponent)
  }
  btnRegistrarce(){
    this.router.navigateByUrl('/registrarce')
  }

}
