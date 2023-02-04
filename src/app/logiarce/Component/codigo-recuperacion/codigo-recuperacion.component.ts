import { RecupeContraComponent } from './../recupe-contra/recupe-contra.component';
import { email } from './../../../models/user/user.module';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-codigo-recuperacion',
  templateUrl: './codigo-recuperacion.component.html',
  styleUrls: ['./codigo-recuperacion.component.css']
})
export class CodigoRecuperacionComponent implements OnInit {
  email=''
  constructor(
    private snackDialogRer: MatDialogRef<CodigoRecuperacionComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  recuperarC(){
    
  }
  cancelarC(){
    this.dialog.open(RecupeContraComponent,{
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms'
    });
    this.cerrarDialog()
  }
  cerrarDialog(){
    this.snackDialogRer.close()
  }

}
