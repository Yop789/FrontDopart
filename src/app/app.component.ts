import { ControllerService } from './services/cart/controller.service';
import { ProcessPaymentService } from 'src/app/services/process-payment.service';
import { IniciarSesionService } from './services/Login/iniciar-sesion.service';
import { EventService } from './services/Eventos/event-service.service';
import {
  Component,
  DoCheck,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  
} from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig } from 'ngx-paypal';
import { OrderProduct, Dta } from './models/order/order.module';
import { Cart } from './models/cart/cart.module';
import { UpdateCartProductsService } from './services/cars-services/updateCartProducts.service';
import { SetCartProductsService } from './services/cars-services/setCartProducts.service';
import { CodigoPostalService } from './services/codigo-postal.service';
import { Comunidad } from './models/comunidad/comunidad.module';
import { BreadcrumbService } from './services/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, DoCheck {
  url = environment.urlImagen;
  isVisibleTop=true
  client=true
  admin=true
  iniciar=false
  breadcrumb: any = []
  title = 'DoParty';
  visibleSidebar2 = false;
  loandingCP1 = true;
  loandingCP2 = false;
  nombre = '';
  codigoPostal = '';
  estado = '';
  municipio = '';
  comunidad = '';
  calle = '';
  numero = '';
  tel = '';
  total = 0;
  data: Comunidad[] = [];
  totalPrecio = 0;
  rangeDates!: Date;
  user = '' + localStorage.getItem('user');
  carga: OrderProduct[] = [];
  mostrar = false;
  dias = 1;
  totalObjet = 0;
  @ViewChild('alInputCodigoP') codigoP: ElementRef | undefined;
  public payPalConfig?: IPayPalConfig;
  constructor(
    private router: Router,
    private updateCartProductsService: UpdateCartProductsService,
    private setCartProductsService: SetCartProductsService,
    private codigoPostalService: CodigoPostalService,
    private renderer2: Renderer2,
    private breadcrumbService:BreadcrumbService,
    private eventService: EventService,
    private ini:IniciarSesionService,
    private ProcessPaymentService:ProcessPaymentService,
    private controllerService:ControllerService,
    private http: HttpClient
  ) {
    this.controllerService.events$.subscribe(events => {
      this.carga=events.list
      this.total=events.list.length
    });
  }
  ngDoCheck() {
    
    this.breadcrumb = this.breadcrumbService.getBreadcrumb() 
  }

  ngOnInit() {
    this.eventService.listen().subscribe(data => {
        this.mostrarCarrito()
    });
    this.ini.listen().subscribe((data)=>{
        this.client=data.cliente
        this.admin=data.admin 
        this.iniciar=data.sinSesion
    })
    
    if (localStorage.getItem('idClient') === '') {
    }
    this.payPalConfig = this.ProcessPaymentService.initConfig();
    this.breadcrumbService.setBreadcrumb('Home','home');
  }
  
  mostrarCarrito() {
    
    
    if (this.visibleSidebar2) {
      
      this.visibleSidebar2 = false;
    } else {
      this.visibleSidebar2 = true;
      
    }

    // Se agrega o se actualiza el carrito en la base de datos
    const l = '' + localStorage.getItem('idCart');
    if (l != '') {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      if (this.totalObjet >= 1) {
        this.updateCartProductsService
          .ubdateCart(l, cart)
          .subscribe((mensaje: any) => {});
      }
    } else {
      const cart: Cart = {
        IdCustomer: this.user,
        Products: this.carga,
      };
      this.setCartProductsService.postCart(cart).subscribe((mensaje: any) => {
        if (mensaje != '') {
         
        }
      });
    }
  }
 
  eliminar(id: string) {
    this.controllerService.eliminarProduct(id)
  }
  detalle(idPoduct: string) {
    localStorage.setItem('idProduct', idPoduct);
    this.router.navigateByUrl('/details');
    this.visibleSidebar2 = false;
  }
  localst() {
    if (
      this.nombre != '' &&
      this.municipio != '' &&
      this.comunidad != '' &&
      this.calle != '' &&
      this.nombre != '' &&
      this.tel != '' &&
      this.rangeDates != null
    ) {
      const dat: Dta = {
        Nombre: this.nombre,
        Municipio: this.municipio,
        Comunidad: this.comunidad,
        Numero: this.numero,
        tel: this.tel,
        rangeDates: this.rangeDates,
        dias: this.dias,
        calle: this.calle,
      };
      this.ProcessPaymentService.setDate(dat);
    }
  }
  resume() {
    this.totalPrecio = Number(this.totalPrecio) * Number(this.dias);
   
  }
  getCodigoPostal() {
    this.LimpiarDireccio();
    this.data = [];
    var c = this.codigoPostal.toString();
    if (c.length == 5) {
      this.loandingCP1 = false;
      this.loandingCP2 = true;
      this.codigoPostalService
        .getPostal(this.codigoPostal)
        .subscribe((codigoP: any) => {
          if (codigoP.estatus === 'si') {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '0px');

            this.estado = codigoP.data.estado;
            this.municipio = codigoP.data.municipio;
            const d = codigoP.data.asentamientos;
            var i = 0;
            d.forEach((elemnt: any) => {
              const c: Comunidad = {
                nombre: elemnt.nombre,
              };
              this.data[i] = c;
              i++;
            });
          } else {
            this.loandingCP1 = true;
            this.loandingCP2 = false;
            const inputCodigoP = this.codigoP?.nativeElement;
            this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
          }
        });
    }else{
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
    if (c == '') {
      this.LimpiarDireccio();
      const inputCodigoP = this.codigoP?.nativeElement;
      this.renderer2.setStyle(inputCodigoP, 'border', '2px solid red');
    }
  }
  LimpiarDireccio(){
    this.estado = '';
    this.municipio = "";
  }
  mostrarCatalogo(pagina:string) {
    this.router.navigateByUrl(`/${pagina}`);
  }
}

