import { email } from './../../../models/user/user.module';
import { DatapagoService } from './../../../services/DataPago/datapago.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user/user.module';
import { PagoPaso3Component } from '../pago-paso3/pago-paso3.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoComponent } from '../pago/pago.component';


@Component({
  selector: 'app-pago-paso2',
  templateUrl: './pago-paso2.component.html',
  styleUrls: ['./pago-paso2.component.css'],
})
export class PagoPaso2Component implements OnInit {
  FormPaso2: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private datapagoService: DatapagoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private snackDialogRer: MatDialogRef<PagoPaso2Component>,
  ) {
    this.FormPaso2 = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
      tel: new FormControl('', [Validators.required, this.validatePhoneNumber]),
      fecha: new FormControl('',[Validators.required,this.minDateValidator])
    });
    this.agegarDataclient()
  }
  minDateValidator(control:FormControl) {
    const selectDate = new Date(control.value)
    const today = new Date();
    if(today < selectDate){
      return  null
    }else return {minDate:true}
    
    
  }
  ngOnInit(): void {}
  validatePhoneNumber(control: FormControl) {
    const phone = control.value;
    if (phone && phone.toString().length !== 10) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }
  validator(id:string) {
    const e = this.FormPaso2.get(id)?.hasError('required');
    const p = this.FormPaso2.get(id)?.hasError('pattern');
    const minD = this.FormPaso2.get(id)?.hasError('minDate');
    const phone = this.FormPaso2.get(id)?.hasError('invalidPhoneNumber');
    if (!e && !p && !phone && !minD) {
      return true;
    } else return false;
  }
  
  agegarDataclient() {
    this.datapagoService.getDataPaso1().subscribe((datacli: any) => {
      const data: User = datacli.body;
      this.FormPaso2.reset({
        email: data.email ,
        tel:data.telefone
      });
    });
  }
  atras(){
    this.dialog.open(PagoComponent, {
      panelClass: 'cart',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.snackDialogRer.close()
  }
  siguiente(){
    if(this.FormPaso2.valid){
      const email =  this.FormPaso2.get('email')?.value
      const tel  =  this.FormPaso2.get('tel')?.value
      const fecha  =  this.FormPaso2.get('fecha')?.value
      const selectDate = new Date(fecha)
      this.datapagoService.agregarPaso2(email,tel,selectDate)
      this.dialog.open(PagoPaso3Component, {
        panelClass: 'cart',
        enterAnimationDuration: '700ms',
        exitAnimationDuration: '700ms',
      });
      this.snackDialogRer.close()
    } else {
      this.alert('Llena todos los cambios para continuar co el siguiente paso')
    }
    
  }

  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
}
