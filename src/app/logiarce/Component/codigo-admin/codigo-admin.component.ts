import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearCodigoService } from './../../../services/CrearCodigo/crear-codigo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LogiComponent } from '../logi/logi.component';
import { HttpResponse } from '@angular/common/http';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';

@Component({
  selector: 'app-codigo-admin',
  templateUrl: './codigo-admin.component.html',
  styleUrls: ['./codigo-admin.component.css'],
})
export class CodigoAdminComponent implements OnInit {
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
    private iniciarSesionService: IniciarSesionService,
    private router: Router,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<CodigoAdminComponent>,
    private formBuilder: FormBuilder,
    private crearCodigoService: CrearCodigoService,
    private snackBar:MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {
    this.iniciar();
  }
  ingresar() {
    this.activate = true;
    if (this.form.valid) {
      const cod = this.form.get('codigo')?.value;

      this.crearCodigoService
        .comparCodigo(cod)
        .subscribe((response: HttpResponse<any>) => {
          if (response.statusText === 'OK') {
            this.matDialogRef.close();
            this.iniciarSesionService.emit(true, false, true);
            this.router.navigateByUrl('/admin');
          }
        },
        (error)=>{
          this.alert(error.error.message)
        }
        );
    }else{
      this.iniciarSesionService.eliminarToken()
      this.openDialogError("Revisa que el campo este llenado correctamente")
    }

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
  cancelar() {
    this.dialog.open(LogiComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.matDialogRef.close();
    this.iniciarSesionService.eliminarToken()
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
