import { User } from 'src/app/models/user/user.module';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegistrarService } from 'src/app/services/registro/registrar.service';
import * as CryptoJS from 'crypto-js';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SucetfullComponent } from 'src/app/Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent implements OnInit {
  showPassword = false;
  form: FormGroup;
  activate = false;
  secretKey = environment.secretKey;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private registro:RegistrarService,
    public dialog: MatDialog
  ) {
    this.PaginaName();
    this.form = this.formBuilder.group(
      {
        nombre: new FormControl('', [Validators.required]),
        apellidos: new FormControl('', [Validators.required]),
        municipio: new FormControl('', [Validators.required]),
        comunidad: new FormControl('', [Validators.required]),
        calle: new FormControl('', [Validators.required]),
        num: new FormControl('', [Validators.required]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ]),
        telefono: new FormControl('', [
          Validators.required,
          this.validatePhoneNumber,
        ]),
        contraseña: new FormControl('', [
          Validators.required,
          this.validatePassword,
        ]),
        validarContraseña: new FormControl('', [Validators.required]),
        aceptaTerminos: [false, Validators.requiredTrue],
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit(): void {}
  PaginaName() {
    this.breadcrumbService.setBreadcrumb('Registrarce', 'registrarce');
  }
  agregarDatos() {
    this.activate = true;

    if (this.form.valid) {
      const nombre = this.form.get('nombre')?.value;
      const apellidos = this.form.get('apellidos')?.value;
      const municipio= this.form.get('municipio')?.value;
      const comunidad = this.form.get('comunidad')?.value;
      const calle = this.form.get('calle')?.value;
      const num = this.form.get('num')?.value;
      const telefono = this.form.get('telefono')?.value;
      const email = this.form.get('email')?.value;
      const contraseña = this.form.get('contraseña')?.value;
      const data:User={
        username: nombre,
        lastName: apellidos,
        email: email,
        password: contraseña,
        municipio: municipio,
        comunidad: comunidad,
        calle: calle,
        numero: num,
        telefone: telefono
      }
      this.registro.postNewUsuari(data).subscribe((response: HttpResponse<User>)=>{
        if (response.ok) {
          this.openDialog("¡Bienvenido! Ahora puedes explorar nuestro catálogo y reservar para tu próxima fiesta.")
        } 
      },
      (error) => {
      console.log(error)
       this.openDialogError("Lo siento, ese correo ya está registrado. Intenta iniciar sesión o contáctanos para más ayuda.")
      }
      )
    } else {
      this.openDialogError("Lo sentimos, no se pudo validar correctamente los campos del formulario. Por favor, verifica tus datos o contáctanos para más ayuda.")
    }
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('contraseña')?.value;
    let confirmPass = group.get('validarContraseña')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }
  validatePhoneNumber(control: FormControl) {
    const phone = control.value;
    if (phone && phone.toString().length !== 10) {
      return { invalidPhoneNumber: true };
    }
    return null;
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
  viciblePassword() {
    this.showPassword = !this.showPassword;
  }
  limpiar() {
    this.form.reset({
      nombre: '',
      apellidos: '',
      municipio: '',
      comunidad: '',
      calle: '',
      num: '',
      email: '',
      telefono: '',
      contraseña: '',
      validarContraseña: '',
      aceptaTerminos: false,
    });
  }
  encriptar(value: string) {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  openDialog(texto:string): void {
    const dialogRef = this.dialog.open(SucetfullComponent, {
      data: { texto: texto }
    });
  }

  openDialogError(texto:string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: { texto: texto }
    });
  }
}
