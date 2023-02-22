import { LogiComponent } from './../../../logiarce/Component/logi/logi.component';
import { ArticulosService } from './../../../services/Articulos/articulos.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';
import { SucetfullComponent } from 'src/app/Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { Product } from 'src/app/models/product/product.module';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-agregar-artirticulos',
  templateUrl: './agregar-artirticulos.component.html',
  styleUrls: ['./agregar-artirticulos.component.css'],
})
export class AgregarArtirticulosComponent implements OnInit {
  form: FormGroup;
  activate = false;
  imag = '';
  ts = true;
  files:any
  nombreDisabled: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private articulosService: ArticulosService
  ) {
    this.form = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      descripción: new FormControl('', [Validators.required]),
      totalArt: new FormControl('', [Validators.required, Validators.min(2)]),
      totalSt: new FormControl('', [Validators.required, Validators.min(2)]),
      totalSer: new FormControl('', [Validators.required, Validators.min(2)]),
      preciArt: new FormControl('', [Validators.required, Validators.min(2)]),
      select: new FormControl('Selecciona un typo', [this.validateSelect]),
      inputImg: new FormControl('', [Validators.required]),
      totalSill: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.min(2),
      ]),
    });
  }
  validateSelect(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === 'Selecciona un typo') {
      if (control.value === 'Mesa') {
        return { activSilla: true };
      } else return { activSilla: true, required: true };
    }
    return null;
  }

  onFileSelected(event: any) {
    this.files=event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imag = e.target.result;
    };

    reader.readAsDataURL(this.files);
  }

  ngOnInit(): void {}

  gf(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue == 'Mesa') {
      this.form.get('totalSill')?.enable();
    } else this.form.get('totalSill')?.disable();
  }
  limpiar() {
    this.form.reset({
      nombre: '',
      descripción: '',
      totalArt: '',
      totalSt: '',
      totalSer: '',
      preciArt: '',
      select: '',
      inputImg: '',
    });
  }

  guardar() {
    this.activate = true;

    if (this.form.valid) {
      const nombre = this.form.get('nombre')?.value;
      const descripción = this.form.get('descripción')?.value;
      const totalArt = this.form.get('totalArt')?.value;
      const totalSt = this.form.get('totalSt')?.value;
      const totalSer = this.form.get('totalSer')?.value;
      const preciArt = this.form.get('preciArt')?.value;
      const select = this.form.get('select')?.value;
      const inputImg = this.form.get('inputImg')?.value;
      const totalSill = this.form.get('totalSill')?.value;
      console.log(this.imag)
      const imageBlob = new Blob([this.files], { type: this.files.type });
      
      const articulo: Product = {
        nameProduct: nombre,
        description: descripción,
        totalProduct: totalArt,
        totalStock: totalSt,
        totalService: totalSer,
        type: select,
        price: preciArt,
        totalSillas: totalSill +0,
        imagePath:<File> imageBlob
      };
      this.articulosService.postNewArticulo(articulo).subscribe(
        (response: HttpResponse<Product>) => {
          if (response.ok) {
            this.openDialog(
              '¡Bienvenido! Ahora puedes explorar nuestro catálogo y reservar para tu próxima fiesta.'
            );
          }
        },
        (error) => {
          if (error.error.message == 'Unauthorized!') {
            this.dialog.open(LogiComponent, {
              enterAnimationDuration: '700ms',
              exitAnimationDuration: '700ms',
            });
          }
          this.openDialogError(
            'Lo siento, ese correo ya está registrado. Intenta iniciar sesión o contáctanos para más ayuda.'
          );
          console.log(error);
        }
      );
    } else {
      this.openDialogError(
        'Lo sentimos, no se pudo validar correctamente los campos del formulario. Por favor, verifica tus datos o contáctanos para más ayuda.'
      );
    }
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
}
