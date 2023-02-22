export interface Product {
  _id?: string,
  nameProduct:string,
  description:string,
  totalProduct:number,
  totalStock:number,
  totalService:number,
  totalSillas?:number,
  type:string,
  price:number,
  imagePath?: File,
}
export interface Type {
  Type: string;
  
}