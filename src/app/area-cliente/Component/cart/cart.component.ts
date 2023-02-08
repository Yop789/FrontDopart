import { DetalleService } from 'src/app/services/Detalles/detalle.service';
import { PagoComponent } from './../../../Pago/Component/pago/pago.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct } from 'src/app/models/order/order.module';
import { ControllerService } from 'src/app/services/cart/controller.service';
import { environment } from 'src/environments/environment';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carga: OrderProduct[] = [];
  total = 0;
  precioOrder = 0;
  piezas = 0;
  url = environment.urlImagen;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private controllerService: ControllerService,
    private router: Router,
    private detalleService:DetalleService,
    private ProcessPaymentService: ProcessPaymentService,
    private dialog: MatDialog,
    private snackDialogRer: MatDialogRef<CartComponent>,
    
  ) {
    this.controllerService.events$.subscribe((events) => {
      this.carga = events.list;
    });
    this.controllerService.listen().subscribe((date:any)=>{
      this.total=date.items
    })

    this.precioOrderCart();
  }

  ngOnInit(): void {
    this.payPalConfig = this.ProcessPaymentService.initConfig();
  }
  eliminar(id: string) {
    this.controllerService.eliminarProduct(id);
    if(this.total===0){
      this.snackDialogRer.close()
    }
  }
  detalle(idPoduct: string) {
    this.detalleService.emit(idPoduct)
    this.router.navigateByUrl('/details');
    this.snackDialogRer.close()
  }
  precioOrderCart() {
    this.controllerService.getCostOrder().subscribe((date: any) => {
      this.precioOrder = date.sumaCostos;
      this.piezas = date.cantidadItem;
    });
  }
  btnVaciar() {
    this.controllerService.vaciar();
    this.controllerService.events$.subscribe((events) => {
      this.carga = events.list;
      this.total = events.list.length;
      this.snackDialogRer.close()
    });
  }
  pagarF(){
    this.dialog.open(PagoComponent,{
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms'
    })
    this.snackDialogRer.close()
  }
}
