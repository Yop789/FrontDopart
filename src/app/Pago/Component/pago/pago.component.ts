import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPayPalConfig } from 'ngx-paypal';
import { CartComponent } from 'src/app/area-cliente/Component/cart/cart.component';
import { Comunidad } from 'src/app/models/comunidad/comunidad.module';
import { Dta } from 'src/app/models/order/order.module';
import { CodigoPostalService } from 'src/app/services/codigo-postal.service';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  paso1=false
  paso2=true
  paso3=true
  loandingCP1 = true;
  loandingCP2 = false;
  codigoPostal = '';
  nombre='';
  municipio='';
  comunidad='';
  calle='';
  tel='';
  numero='';
  dias=1;
  rangeDates=new Date();
  estado='';
  codigoP: any;
  data: any;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private renderer2: Renderer2,
    private ProcessPaymentService: ProcessPaymentService,
    private codigoPostalService: CodigoPostalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.payPalConfig = this.ProcessPaymentService.initConfig();
  }
  localst() {
    if (
      this.nombre != '' &&
      this.municipio != '' &&
      this.comunidad != '' &&
      this.calle != '' &&
      this.nombre != '' &&
      this.tel != '' &&
      this.rangeDates!=null
    ) {
      const dat: Dta = {
        Nombre: this.nombre,
        Municipio: this.municipio,
        Comunidad: this.comunidad,
        Numero: this.numero,
        tel: this.tel,
        rangeDates: this.rangeDates,
        dias: this.dias,
        calle: this.calle,
      };
      this.ProcessPaymentService.setDate(dat);
    }
  }
  LimpiarDireccio() {
    this.estado = '';
    this.municipio = '';
  }
  getCodigoPostal() {
    this.LimpiarDireccio();
    this.data = [];
    var c = this.codigoPostal.toString();
    if (c.length == 5) {
      this.loandingCP1 = false;
      this.loandingCP2 = true;
      this.codigoPostalService
        .getPostal(this.codigoPostal)
        .subscribe((codigoP: any) => {
          if (codigoP.estatus === 'si') {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '0px');

            this.estado = codigoP.data.estado;
            this.municipio = codigoP.data.municipio;
            const d = codigoP.data.asentamientos;
            var i = 0;
            d.forEach((elemnt: any) => {
              const c: Comunidad = {
                nombre: elemnt.nombre,
              };
              this.data[i] = c;
              i++;
            });
          } else {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
          }
        });
    } else {
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
    if (c == '') {
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
  }
  siguiente(){
    if(!this.paso1){
      this.paso1=true
      this.paso2=false
    }else{
      if(!this.paso2){
        this.paso2=true
        this.paso3=false
      }
    }
  }
  atras(){
    if(!this.paso2){
      this.paso1=false
      this.paso2=true
    }else{
      if(!this.paso3){
        this.paso2=false
        this.paso3=true
      }
    }
  }
  cancelar(){
      this.dialog.open(CartComponent,{
        panelClass:'cart',
        enterAnimationDuration:'700ms',
        exitAnimationDuration:'700ms'
      })
  }
}
