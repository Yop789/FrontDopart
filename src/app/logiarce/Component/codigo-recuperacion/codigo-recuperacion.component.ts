import { CrearCodigoService } from './../../../services/CrearCodigo/crear-codigo.service';
import { RecupeContraComponent } from './../recupe-contra/recupe-contra.component';
import { email } from './../../../models/user/user.module';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { SucetfullComponent } from 'src/app/Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';

@Component({
  selector: 'app-codigo-recuperacion',
  templateUrl: './codigo-recuperacion.component.html',
  styleUrls: ['./codigo-recuperacion.component.css'],
})
export class CodigoRecuperacionComponent implements OnInit {
  email = '';
  tiempo = false;
  showPassword = false;
  activate = false;
  form: FormGroup;
  minutos: number = 5;
  segundos: number = 0;
  intervalo: any;
  corriendo: boolean = false;
  constructor(
    private snackDialogRer: MatDialogRef<CodigoRecuperacionComponent>,
    private crearCodigoService: CrearCodigoService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group(
      {
        contraseña: new FormControl('', [
          Validators.required,
          this.validatePassword,
        ]),
        validarContraseña: new FormControl('', [Validators.required]),
        codigo: new FormControl('', [Validators.required]),
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.iniciar();
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('contraseña')?.value;
    let confirmPass = group.get('validarContraseña')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  validatePassword(control: FormControl) {
    let password = control.value;
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return { invalidPassword: true };
    }
    return null;
  }
  recuperarC() {
    this.activate = true;
    if (this.form.valid) {
      const codigo = this.form.get('codigo')?.value;
      const password = this.form.get('contraseña')?.value;
      this.crearCodigoService.ubdateContraseña(password, codigo).subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            this.cerrarDialog();
            this.openDialog(
              'La contraseña de tu cuenta ha sido actualizada con éxito. Por favor, inicia sesión con tu nueva contraseña para acceder al sitio web Dofest.'
            );
          }
        },
        (error) => {
          this.alert(error.error.message)
        }
      );
    } else {
      this.openDialogError('Se nesecitan llenar todo los campos de este formulario');
    }
  }
  cancelarC() {
    this.dialog.open(RecupeContraComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.cerrarDialog();
  }
  cerrarDialog() {
    this.snackDialogRer.close();
  }
  viciblePassword() {
    this.showPassword = !this.showPassword;
  }
  iniciar() {
    this.corriendo = true;
    this.intervalo = setInterval(() => {
      if (this.minutos == 0 && this.segundos == 0) {
        this.tiempo = true;
        this.parar();
        return;
      }
      if (this.segundos == 0) {
        this.minutos--;
        this.segundos = 59;
      } else {
        this.segundos--;
      }
    }, 1000);
  }

  parar() {
    this.corriendo = false;
    clearInterval(this.intervalo);
  }

  resetear() {
    this.minutos = 5;
    this.segundos = 0;
    this.corriendo = false;
    clearInterval(this.intervalo);
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  openDialog(texto: string): void {
    const dialogRef = this.dialog.open(SucetfullComponent, {
      data: { texto: texto },
    });
  }
  openDialogError(texto:string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: { texto: texto }
    });
  }
}
