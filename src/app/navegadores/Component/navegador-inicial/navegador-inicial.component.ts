import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegador-inicial',
  templateUrl: './navegador-inicial.component.html',
  styleUrls: ['./navegador-inicial.component.css']
})
export class NavegadorInicialComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  mostrarMenu(pagina:string) {
    this.router.navigateByUrl(`/${pagina}`);
  }

}
