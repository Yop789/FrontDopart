import { AgregarArtirticulosComponent } from './../agregar-artirticulos/agregar-artirticulos.component';
import { Product } from './../../../models/product/product.module';
import { ArticulosService } from './../../../services/Articulos/articulos.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/Dalogos/Error/error/error.component';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css'],
})
export class NuevoProductoComponent implements OnInit {
  constructor(
    private articulosService: ArticulosService,
    public dialog: MatDialog
  ) {}
  articulos: Product[] = [];
  conArticulos = false;
  ngOnInit() {
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

  openDialogError(texto: string): void {
    const dialogRef = this.dialog.open(ErrorComponent, {
      data: { texto: texto },
    });
  }
  agregarArticulos(){
    this.dialog.open(AgregarArtirticulosComponent)
  }
}
