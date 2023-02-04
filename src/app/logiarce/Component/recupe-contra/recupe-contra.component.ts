import { CodigoRecuperacionComponent } from './../codigo-recuperacion/codigo-recuperacion.component';
import { CodigoPostalService } from './../../../services/codigo-postal.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogiComponent } from 'src/app/logiarce/Component/logi/logi.component';
import { email } from './../../../models/user/user.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recupe-contra',
  templateUrl: './recupe-contra.component.html',
  styleUrls: ['./recupe-contra.component.css']
})
export class RecupeContraComponent implements OnInit {
  email=''
  constructor
  (
    private snackDialogRer: MatDialogRef<RecupeContraComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  recuperar(){
    this.dialog.open(CodigoRecuperacionComponent,{
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms'
    });
    this.cerrarDialog()
  }
  cancelar(){
    this.dialog.open(LogiComponent,{
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms'
    });
    this.cerrarDialog()
  }
  cerrarDialog(){
    this.snackDialogRer.close()
  }
}
