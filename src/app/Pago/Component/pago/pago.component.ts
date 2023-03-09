import { User } from './../../../models/user/user.module';
import { DatapagoService } from './../../../services/DataPago/datapago.service';
import { CodigoPostal } from './../../../models/codigo-postal/codigo-postal.module';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartComponent } from 'src/app/area-cliente/Component/cart/cart.component';
import { Comunidad } from 'src/app/models/comunidad/comunidad.module';
import { CodigoPostalService } from 'src/app/services/codigo-postal.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagoPaso2Component } from '../pago-paso2/pago-paso2.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  loandingCP1 = true;
  loandingCP2 = false;
  data: Comunidad[] = [];
  FormPaso1: FormGroup;
  Login = true;
  constructor(
    private codigoPostalService: CodigoPostalService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private snackDialogRer: MatDialogRef<PagoComponent>,
    private datapagoService: DatapagoService
  ) {
    //-------------FormPaso1--------------------------------------------------------------------
    this.FormPaso1 = this.formBuilder.group({
      nombreCompleto: new FormControl('', Validators.required),
      minicipio: new FormControl('', Validators.required),
      select: new FormControl('Selecciona tu comunidad', this.selectTrue),
      calle: new FormControl('', Validators.required),
      codigoPostal: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[0-9]+$'),
      ]),
      numHogar: new FormControl('', Validators.required),
    });
    // ----------------------------------------------------------------------
    this.agegarDataclient()
  }

  ngOnInit(): void {}
  color(id:string) {
    const r = this.FormPaso1.get(id)?.hasError('required');
    const m = this.FormPaso1.get(id)?.hasError('minlength');
    const p = this.FormPaso1.get(id)?.hasError('pattern');
    if (!r && !m && !p) {
      return true;
    } else return false;
  }

  localst() {}
  LimpiarDireccio() {}
  getCodigoPostal() {
    const r = this.FormPaso1.get('codigoPostal')?.hasError('required');
    const m = this.FormPaso1.get('codigoPostal')?.hasError('minlength');
    const p = this.FormPaso1.get('codigoPostal')?.hasError('pattern');
    if (!r && !m && !p) {
      const cp = '' + this.FormPaso1.get('codigoPostal')?.value;
      this.loandingCP1 = false;
      this.loandingCP2 = true;
      this.codigoPostalService.getPostal(cp).subscribe((codigoP: any) => {
        if (codigoP.statusText === 'OK') {
          this.loandingCP1 = true;
          this.loandingCP2 = false;
          const d = codigoP.body;
          const municipio = d[0].D_mnpio;
          this.Agregarmunicipio(municipio);
          var i = 0;

          d.forEach((elemnt: CodigoPostal) => {
            const c: Comunidad = {
              nombre: elemnt.d_asenta,
            };
            this.data.push(c);
            i++;
          });
        } else {
          this.loandingCP1 = true;
          this.loandingCP2 = false;
        }
      });
    } else {
    }
  }
 
  siguiente() {
    if (this.FormPaso1.valid) {
      const n = this.FormPaso1.get('nombreCompleto')?.value;
      const m = this.FormPaso1.get('minicipio')?.value;
      const c = this.FormPaso1.get('select')?.value;
      const cp = this.FormPaso1.get('codigoPostal')?.value;
      const call = this.FormPaso1.get('calle')?.value;
      const nuum = this.FormPaso1.get('numHogar')?.value;
      this.datapagoService.agregarPaso1(n, cp, m, c, call, nuum);
      this.dialog.open(PagoPaso2Component, {
        panelClass: 'cart',
        enterAnimationDuration: '700ms',
        exitAnimationDuration: '700ms',
      });
      this.snackDialogRer.close()
    } else {
      this.alert(
        'llena todos los campos para continual con los siguientes pasos'
      );
    }
  }
 
  cancelar() {
    this.dialog.open(CartComponent, {
      panelClass: 'cart',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
  }
  Agregarmunicipio(munp: string) {
    this.FormPaso1.patchValue({ minicipio: munp });
  }
  selectTrue(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value == 'Selecciona tu comunidad') {
      return { required: true };
    } else return null;
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }

  agegarDataclient(){
    this.datapagoService.getDataPaso1().subscribe((datacli:any)=>{
      const data:User= datacli.body
      this.FormPaso1.reset({
        nombreCompleto:data.username+' '+data.lastName,
        select: 'Selecciona tu comunidad'
      })
    })
    
  }
}
