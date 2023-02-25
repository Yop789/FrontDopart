import { BreadcrumbService } from './../../../services/breadcrumb.service';
import { AgregarArtirticulosComponent } from './../agregar-artirticulos/agregar-artirticulos.component';
import { Product } from './../../../models/product/product.module';
import { ArticulosService } from './../../../services/Articulos/articulos.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';
import { ConfirmarComponent } from 'src/app/Dalogos/confirmar/confirmar.component';
import { SucetfullComponent } from 'src/app/Dalogos/Sucetfull/sucetfull/sucetfull.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
})
export class NuevoProductoComponent implements OnInit {
  urlIm = environment.urlApi + '/';
  edi = false;
  constructor(
    private articulosService: ArticulosService,
    private dialog: MatDialog,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.setBreadcrumb('Articulos', 'admin/nuevosProductos');
  }
  articulos: Product[] = [];
  conArticulos = false;
  ngOnInit() {
    this.optenerArticulos();
  }
  optenerArticulos() {
    this.articulosService.getProducts().subscribe(
      (response: HttpResponse<any>) => {
        if (response.ok) {
          this.articulos = response.body;
          if (response.body.length > 0) {
          } else this.conArticulos = true;
        }
      },
      (error) => {
        this.conArticulos = true;
        this.openDialogError(
          'Lo siento, no se puede acceder a la base de datos en este momento. Por favor, inténtalo de nuevo más tarde o contáctanos para más información.'
        );
      }
    );
  }

  agregarArticulos() {
    this.articulosService.eliminarDataEr();
    this.dialog.open(AgregarArtirticulosComponent);
  }
  eliminar(id: string) {
    const dialogRef = this.dialog.open(ConfirmarComponent, {
      data: '¿Estás seguro de eliminar este artículo de nuestros productos? Ten en cuenta que no se podrá recuperar una vez eliminado.',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(id);
        this.articulosService.deleteArticulo(id).subscribe(
          (response: HttpResponse<any>) => {
            if (response.ok) {
              this.openDialog(
                'El artículo ha sido eliminado correctamente de nuestra base de datos de productos.'
              );
              this.optenerArticulos();
            }
          },
          (error) => {
            console.log(error);
            this.openDialogError(error.error.message);
          }
        ); // Realizar la acción que se desea hacer después de confirmar
      }
    });
  }
  editar(id: string) {
    this.articulosService.getArticulo(id).subscribe(
      (response: HttpResponse<any>) => {
        if (response.ok) {
          const l = this.dialog.open(AgregarArtirticulosComponent);
          l.afterClosed().subscribe((result) => {
            this.optenerArticulos()
          });
        }
      },
      (error) => {
        this.conArticulos = true;
        this.openDialogError(
          'Lo siento, no se puede acceder a la base de datos en este momento. Por favor, inténtalo de nuevo más tarde o contáctanos para más información.'
        );
      }
    );
  }

  //Dialogos ---------------------------------------------------------------------------------------
  openDialog(texto: string): void {
    const dialogRef = this.dialog.open(SucetfullComponent, {
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',

      data: { texto: texto },
    });
  }
  openDialogError(texto: string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: { texto: texto },
    });
  }
}
