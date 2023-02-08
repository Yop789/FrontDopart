import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erro',
  templateUrl: './erro.component.html',
  styleUrls: ['./erro.component.css']
})
export class ErroComponent implements OnInit {

  constructor(
    private router:Router,
  ) {
    
   }

  ngOnInit(): void {
  }
  home(){
    this.router.navigateByUrl("/home")
  }
}
