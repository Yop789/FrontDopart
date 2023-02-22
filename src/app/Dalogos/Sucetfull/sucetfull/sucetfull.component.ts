import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucetfull',
  templateUrl: './sucetfull.component.html',
  styleUrls: ['./sucetfull.component.css']
})
export class SucetfullComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { texto: string }) {}

  ngOnInit(): void {
  }

}
