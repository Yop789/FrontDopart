import { CodigoAdminComponent } from './../codigo-admin/codigo-admin.component';
import { RecupeContraComponent } from './../recupe-contra/recupe-contra.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IniciarSesionService } from './../../../services/Login/iniciar-sesion.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-logi',
  templateUrl: './logi.component.html',
  styleUrls: ['./logi.component.css'],
})
export class LogiComponent implements OnInit {
  secretKey = environment.secretKey;
  email = '';
  password = '';

  constructor(
    private router: Router,
    private iniciarSesionService: IniciarSesionService,
    private snackBar: MatSnackBar,
    private snackDialogRer: MatDialogRef<LogiComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  log_in() {
    if (this.email == '') {
      this.alert('Agrega tu usuario email');
    } else if (this.password == '') {
      this.alert('Agrega tu contraseña');
    } else {
      this.iniciarSesionService
        .login(this.email, this.password).subscribe((response: HttpResponse<any>)=>{
          if (response.ok) {
            let l=this.iniciarSesionService.decodificar(response.body.token)
            if(l==="moderator" || l==="admin" ){
              
              this.dialog.open(CodigoAdminComponent)
            }
            this.cerrarDialog()
          } 
        },
        (error) => {
          this.alert(error.error.message)
        })
    }
  }
  alert(text: string) {
    this.snackBar.open('' + text, '', {
      duration: 3000,
    });
  }
  btnQUC() {
    this.router.navigateByUrl('/registrarce');
    this.cerrarDialog();
  }
  cerrarDialog() {
    this.snackDialogRer.close();
  }
  recuperar() {
    this.dialog.open(RecupeContraComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
    });
    this.cerrarDialog();
  }
  obtenerEmail(event: any) {
    if (event.target.value != '') {
      this.email = event.target.value;
      event.target.style = 'border-color:#374342';
    } else {
      event.target.style = 'border-color:red';
      this.email = '';
    }
  }
  obtenerPass(event: any) {
    if (event.target.value != '') {
      this.password = event.target.value;
      event.target.style = 'border-color:#374342';
    } else {
      this.password = '';
      event.target.style = 'border-color:red';
    }
  }
}
