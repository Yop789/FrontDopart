export interface Order {
  idUser: string,
  status:string,
  fullNameUser: string,
  paid: boolean,
  municipio:string,
  comunidad: string,
  calle:string,
  numero:string,
  email:string,
  telefono:string,
  dateDeliver:Date,
  dateEvent:Date,
  dateReturn: Date,
  days: number,
  totalPrecio: number,
  Products: OrderProduct[];
}
export interface OrderProduct {
  _id?: string;
  idProduct: string,
  nameProduct: string,
  description:string,
  amount:number,
  total: number,
  urlImage: string
}
export interface Dta{
  dias: number;
  Nombre: string;
  Municipio:string;
  Comunidad: string;
  calle: string;
  Numero: string;
  tel: string;
  rangeDates: Date;
}
