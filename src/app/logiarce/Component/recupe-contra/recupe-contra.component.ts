import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearCodigoService } from './../../../services/CrearCodigo/crear-codigo.service';
import { CodigoRecuperacionComponent } from './../codigo-recuperacion/codigo-recuperacion.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogiComponent } from 'src/app/logiarce/Component/logi/logi.component';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SucetfullComponent } from 'src/app/Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-recupe-contra',
  templateUrl: './recupe-contra.component.html',
  styleUrls: ['./recupe-contra.component.css'],
})
export class RecupeContraComponent implements OnInit {
  email = '';
  form: FormGroup;
  activate = false;
  constructor(
    private formBuilder: FormBuilder,
    private snackDialogRer: MatDialogRef<RecupeContraComponent>,
    private dialog: MatDialog,
    private crearCodigoService:CrearCodigoService,
    private snackBar:MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
    });
  }

  ngOnInit(): void {}
  recuperar() {
    this.dialog.open(CodigoRecuperacionComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.cerrarDialog();
}
  cancelar() {
    this.dialog.open(LogiComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.cerrarDialog();
  }

  enviar() {
    this.activate = true;

    if (this.form.valid) {
      const email = this.form.get('email')?.value
      this.crearCodigoService.post(email).subscribe((response: HttpResponse<any>)=>{
        if (response.ok) {
          this.recuperar()
          this.alert("Un código de recuperación de contraseña ha sido enviado a tu correo electrónico. Por favor, sigue las instrucciones para recuperar tu cuenta.")
        } 
      },
      (error) => {
        console.log(error.error.message)
        if(error.error.message == "Email incorrecto"){
          this.alert(error.error.message)

        }else this.openDialogError("No se pudo validar tu correo electrónico en la base de datos en este momento. Por favor, verifica tus datos e inténtalo de nuevo o contáctanos para más asistencia.")
      }
      )
    } else {
      this.openDialogError("Lo sentimos, no se pudo validar correctamente el campos email. Por favor, verifica tu email o contáctanos para más ayuda.")
    }
  }

  cerrarDialog() {
    this.snackDialogRer.close();
  }
  openDialog(texto: string): void {
    const dialogRef = this.dialog.open(SucetfullComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',

      data: { texto: texto },
    });
  }
  openDialogError(texto: string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
      data: { texto: texto },
    });
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
}
