import { DatapagoService } from './../../../services/DataPago/datapago.service';
import { PagoPaso2Component } from './../pago-paso2/pago-paso2.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPayPalConfig } from 'ngx-paypal';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';

@Component({
  selector: 'app-pago-paso3',
  templateUrl: './pago-paso3.component.html',
  styleUrls: ['./pago-paso3.component.css'],
})
export class PagoPaso3Component implements OnInit {
  public payPalConfig?: IPayPalConfig;
  constructor(
    private ProcessPaymentService: ProcessPaymentService,
    private dialog: MatDialog,
    private snackDialogRer: MatDialogRef<PagoPaso3Component>,
    private aatapagoService:DatapagoService
  ) {
    
  }

  ngOnInit(): void {
    this.payPalConfig = this.ProcessPaymentService.initConfig();
  }
  atras() {
    this.dialog.open(PagoPaso2Component, {
      panelClass: 'cart',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.snackDialogRer.close();
  }
}
