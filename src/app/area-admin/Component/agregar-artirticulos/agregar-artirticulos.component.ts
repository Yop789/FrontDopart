import { environment } from './../../../../environments/environment';
import { LogiComponent } from './../../../logiarce/Component/logi/logi.component';
import { ArticulosService } from './../../../services/Articulos/articulos.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  imag = '../assets/img/k.png';
  ts = true;
  id = ""
  files!: File;
  nombreDisabled: any;
  editar = false;
  detals= false;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private articulosService: ArticulosService,
    public dialogRef:MatDialogRef<AgregarArtirticulosComponent>
  ) {
    this.form = this.formBuilder.group({
      nombre: new FormControl({ value: '', disabled: false }, [Validators.required]),
      descripción: new FormControl({ value: '', disabled: false }, [Validators.required]),
      totalArt: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(2)]),
      totalSt: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(2)]),
      totalSer: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(2)]),
      preciArt: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.min(2)]),
      select: new FormControl({ value: 'Selecciona un typo', disabled: false }, [this.validateSelect]),
      inputImg: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      totalSill: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.min(2),
      ]),
    });

    this.set();
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
    this.files = event.target.files[0];
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
      const articulo: Product = {
        nameProduct: nombre,
        description: descripción,
        totalProduct: totalArt,
        totalStock: totalSt,
        totalService: totalSer,
        type:select,
        price: preciArt,
        totalSillas: totalSill + 0,
        imagePath:this.files
      };
      if(this.editar){
        this.metodoEditar(articulo)
      }else{
        this.metodoGuardar(articulo)
      }
    } else {
      this.openDialogError(
        'Lo sentimos, no se pudo validar correctamente los campos del formulario. Por favor, verifica tus datos o contáctanos para más ayuda.'
      );
    }
  }

  set() {
    const l = this.articulosService.getDataArt();
    
    if (l) {
      this.form.reset({
        nombre: l.art.nameProduct,
        descripción: l.art.description,
        totalArt: l.art.totalProduct,
        totalSt: l.art.totalStock,
        totalSer: l.art.totalService,
        preciArt: l.art.price,
        select: l.art.type,
        totalSill: l.art.totalSillas
      });
      this.id =""+l.art._id
      this.imag = environment.urlApi + '/' + l.art.imagePath;
      this.form.get('inputImg')?.disable();
      if(l.status){
        this.editar = true;
       
      }else{
        this.detals = true
        this.form.get('nombre')?.disable();
        this.form.get('descripción')?.disable();
        this.form.get('totalArt')?.disable();
        this.form.get('totalSt')?.disable();
        this.form.get('totalSer')?.disable();
        this.form.get('preciArt')?.disable();
        this.form.get('select')?.disable();


      }
      
    } else {
      this.editar = false;
      this.form.get('inputImg')?.enable();
    }
  }
  //---------------------------------------------dialog---------------------------------------------------------------------------------------------------
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
  //-----------------------------------------metodos particulares------------------------------------------------------------------------------------
  metodoGuardar(articulo:Product){
    this.articulosService.postNewArticulo(articulo).subscribe(
      (response: HttpResponse<Product>) => {
        if (response.ok) {
          this.openDialog(
            'Se a aguardado correctamente en la base de datos'
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
          'Lo siento, a sucedido un error al momento de guardar el articulo intentelo de nuevo o contacte al administrador '
        );
        console.log(error);
      }
    );
  
  }
  metodoEditar(articulo:Product){
    this.articulosService.updateArticulos(this.id,articulo).subscribe(
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
  
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
